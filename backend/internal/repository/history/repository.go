package history

import (
	gormmodel "data-tokenization/internal/pkg/model/gorm"

	"gorm.io/gorm"
)

type Repo interface {
	Add(historyModel *gormmodel.AddHistoryModel) error
}

type Repository struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}
