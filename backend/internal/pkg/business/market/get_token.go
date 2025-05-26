package market

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/status"
)

// GetToken - возвращает информацию о токене
func (s *Service) GetToken(tokenIdentity domain.TokenIdentity) (*domain.Token, error) {
	token, err := s.tokenRepo.Get(tokenIdentity)
	if err != nil {
		return nil, err
	}

	if !token.IsOnMarket {
		err = &status.Err{
			Code:    status.Forbidden,
			Message: "token is not on market",
		}
		return token, err
	}

	return token, nil
}
