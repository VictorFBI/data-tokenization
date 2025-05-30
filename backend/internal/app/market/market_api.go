package market

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	model "data-tokenization/internal/pkg/model/service"
)

type service interface {
	GetToken(domain.TokenIdentity) (*domain.Token, error)
	GetTokensByFilter(*gormmodel.GetTokensByFilterModel) ([]model.TokenInfoForList, error)
}

type API struct {
	s service
}

func NewAPI(service service) *API {
	return &API{
		s: service,
	}
}
