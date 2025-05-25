package history

import (
	"data-tokenization/internal/pkg/model/gorm"
	"errors"
)

func (r *Repository) Add(historyModel *gorm.AddHistoryModel) error {
	if historyModel == nil {
		return errors.New("historyModel for Add is nil")
	}

	err := r.db.
		Table("history").
		Create(historyModel).
		Error

	return err
}
