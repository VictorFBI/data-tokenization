package history

import (
	"data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/tablename"
	"errors"
)

func (r *Repository) Add(historyModel *gorm.AddHistoryModel) error {
	if historyModel == nil {
		return errors.New("historyModel for Add is nil")
	}

	err := r.db.
		Table(tablename.History).
		Create(historyModel).Error

	return common.MapCommonError(err)
}
