package history

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"

	"gorm.io/gorm"
)

type Repo interface {
	Add(*gormmodel.AddHistoryModel) error
	List(*gormmodel.ListUserHistoryModel) ([]domain.History, error)
}

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}
