package user

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
)

// GetHistory - возвращает историю действий пользователя
func (s *Service) GetHistory(historyModel *gormmodel.ListUserHistoryModel) ([]domain.History, error) {
	return s.uow.HistoryRepo().List(historyModel)
}
