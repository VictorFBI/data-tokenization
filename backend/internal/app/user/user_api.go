package user

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
)

type service interface {
	GetToken(*gorm.TokenModel) (*domain.Token, error)
	GetTokensByFilter(*gorm.GetTokensByFilterModel) ([]domain.TokenInfoForList, error)
	DeleteToken(*gorm.TokenModel) (bool, error)
}

type API struct {
	s service
}

func NewAPI(service service) *API {
	return &API{
		s: service,
	}
}
