package user

import (
	"data-tokenization/internal/pkg/model/domain"
)

// GetToken - возвращает информацию о токене
func (s *Service) GetToken(tokenIdentity domain.TokenIdentity) (*domain.Token, error) {
	return s.uow.TokenRepo().Get(tokenIdentity)
}
