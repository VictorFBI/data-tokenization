package user

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
)

type service interface {
	GetToken(*gorm.GetTokenModel) (*domain.Token, error)
	GetTokensByFilter(*gorm.GetTokensByFilterModel) ([]domain.TokenInfoForList, error)
}

type API struct {
	s service
}

func NewAPI(service service) *API {
	return &API{
		s: service,
	}
}
