package user

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
	"database/sql"
	"time"
)

// DeleteToken - удаляет токен из репозитория, если находит такой
func (s *Service) DeleteToken(tokenIdentity domain.TokenIdentity) (bool, error) {
	err := s.uow.StartOperationSet(sql.LevelReadCommitted)
	if err != nil {
		return false, err
	}
	defer func() {
		_ = s.uow.Rollback()
	}()

	success, err := s.uow.TokenRepo().Delete(tokenIdentity)
	if err != nil || !success {
		return false, err
	}

	err = s.uow.HistoryRepo().Add(&gorm.AddHistoryModel{
		UserID:    tokenIdentity.UserID,
		TokenName: tokenIdentity.Name,
		Action:    gorm.HistoryActionDelete,
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
