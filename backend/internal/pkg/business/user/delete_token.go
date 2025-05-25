package user

import (
	"data-tokenization/internal/pkg/model/gorm"
	"database/sql"
	"time"
)

// DeleteToken - удаляет токен из репозитория, если находит такой
func (s *Service) DeleteToken(tokenModel *gorm.TokenModel) (bool, error) {
	err := s.uow.StartOperationSet(sql.LevelReadCommitted)
	if err != nil {
		return false, err
	}
	defer func() {
		_ = s.uow.Rollback()
	}()

	success, err := s.uow.TokenRepo().Delete(tokenModel)
	if err != nil || !success {
		return false, err
	}

	err = s.uow.UserHistoryRepo().Add(&gorm.AddHistoryModel{
		UserID:    tokenModel.UserID,
		TokenName: tokenModel.Name,
		Action:    gorm.HistoryActionDeleted,
		CreatedAt: time.Now(),
	})
	if err != nil {
		return false, err
	}

	if err := s.uow.Complete(); err != nil {
		return false, err
	}

	return success, nil
}
