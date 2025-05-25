package user

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
)

// GetToken - возвращает информацию о токене
func (s *Service) GetToken(model *gormmodel.TokenModel) (*domain.Token, error) {
	return s.uow.TokenRepo().Get(model)
}
