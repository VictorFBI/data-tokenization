package market

import (
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	model "data-tokenization/internal/pkg/model/service"
)

// GetTokensByFilter - возвращает список токенов, удовлетворяющие фильтру
func (s *Service) GetTokensByFilter(filterModel *gormmodel.GetTokensByFilterModel) ([]model.TokenInfoForList, error) {
	return s.tokenRepo.ListByFilter(filterModel)
}
