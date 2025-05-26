package token

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	model "data-tokenization/internal/pkg/model/service"

	"gorm.io/gorm"
)

type Repo interface {
	Get(domain.TokenIdentity) (*domain.Token, error)
	ListByFilter(*gormmodel.GetTokensByFilterModel) ([]model.TokenInfoForList, error)
	Delete(domain.TokenIdentity) (bool, error)
	Update(*gormmodel.UpdateTokenModel) (bool, error)
}

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}
