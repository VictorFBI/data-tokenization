package user

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	model "data-tokenization/internal/pkg/model/service"
	"io"
)

type service interface {
	GetToken(domain.TokenIdentity) (*domain.Token, error)
	GetTokensByFilter(*gormmodel.GetTokensByFilterModel) ([]model.TokenInfoForList, error)
	DeleteToken(domain.TokenIdentity) (bool, error)
	UpdateToken(*gormmodel.UpdateTokenModel) error
	GetHistory(*gormmodel.ListUserHistoryModel) ([]domain.History, error)
	CreateToken(*gorm.CreateTokenModel, io.ReadCloser, string) error
}

type API struct {
	s service
}

func NewAPI(service service) *API {
	return &API{
		s: service,
	}
}
