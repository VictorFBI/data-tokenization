package history

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/historycolumn"
	"data-tokenization/internal/repository/schema/tablename"
	"fmt"
)

func (r *Repository) List(historyModel *gormmodel.ListUserHistoryModel) ([]domain.History, error) {
	var t []domain.History
	query := fmt.Sprintf("%s = ?", historycolumn.UserID)

	err := r.db.
		Table(tablename.History).
		Where(query, historyModel.UserID).
		Find(&t).
		Limit(historyModel.Limit).
		Offset(historyModel.Cursor).Error

	return t, common.MapCommonError(err)
}
