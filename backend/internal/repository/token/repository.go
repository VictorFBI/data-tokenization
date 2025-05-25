package token

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"

	"gorm.io/gorm"
)

type Repo interface {
	Get(*gormmodel.TokenModel) (*domain.Token, error)
	GetListByFilter(*gormmodel.GetTokensByFilterModel) ([]domain.TokenInfoForList, error)
	Delete(*gormmodel.TokenModel) (bool, error)
}

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}
