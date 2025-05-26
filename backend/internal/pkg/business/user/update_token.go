package user

import (
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/pkg/model/status"
	"database/sql"
	"fmt"
	"time"
)

// UpdateToken - обновляет информацию о токене
func (s *Service) UpdateToken(updateModel *gormmodel.UpdateTokenModel) error {
	err := s.uow.StartOperationSet(sql.LevelReadCommitted)
	if err != nil {
		return err
	}
	defer func() {
		_ = s.uow.Rollback()
	}()

	success, err := s.uow.TokenRepo().Update(updateModel)
	if err != nil {
		return err
	}
	if !success {
		err = &status.Err{
			Code:    status.NotFound,
			Message: fmt.Sprintf("token with this name (%s) not found", updateModel.TokenIdentity.Name),
		}
		return err
	}

	err = s.uow.HistoryRepo().Add(&gormmodel.AddHistoryModel{
		UserID:    updateModel.TokenIdentity.UserID,
		TokenName: updateModel.TokenIdentity.Name,
		Action:    gormmodel.HistoryActionUpdate,
		CreatedAt: time.Now(),
	})
	if err != nil {
		return err
	}

	if err := s.uow.Complete(); err != nil {
		return err
	}

	return nil
}
