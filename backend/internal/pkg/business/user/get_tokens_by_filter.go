package user

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
)

// GetTokensByFilter - возвращает список токенов, удовлетворяющие фильтру
func (s *Service) GetTokensByFilter(filterModel *gormmodel.GetTokensByFilterModel) ([]domain.TokenInfoForList, error) {
	return s.tokenRepo.GetListByFilter(filterModel)
}
