package token

import (
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	model "data-tokenization/internal/pkg/model/service"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/tablename"
	"data-tokenization/internal/repository/schema/tokenscolumn"
	"errors"
	"fmt"

	"github.com/samber/lo"
	"gorm.io/gorm"
)

func (r *Repository) ListByFilter(filterModel *gormmodel.GetTokensByFilterModel) ([]model.TokenInfoForList, error) {
	if filterModel == nil {
		return nil, errors.New("filterModel for ListByFilter is nil")
	}

	filter := filterModel.Filter
	query := r.db.
		Table(tablename.Tokens).
		Select(fmt.Sprintf("%s, %s, %s, %s, %s",
			tokenscolumn.UserID, tokenscolumn.Name, tokenscolumn.Type, tokenscolumn.Price, tokenscolumn.CurrencyCode))

	query = buildWhere(query, filterModel)

	if filter.SortDirectionOnUpdatedAt != nil {
		switch *filter.SortDirectionOnUpdatedAt {
		case gormmodel.SortDirectionAsc:
			query = query.Order(tokenscolumn.UpdatedAt + "ASC")
		case gormmodel.SortDirectionDesc:
			query = query.Order(tokenscolumn.UpdatedAt + "DESC")
		}
	}

	query = query.
		Limit(filterModel.Limit).
		Offset(filterModel.Cursor)

	var mainTokenInfos []model.TokenInfoForList
	err := query.Find(&mainTokenInfos).Error

	return mainTokenInfos, common.MapCommonError(err)
}

func buildWhere(query *gorm.DB, filterModel *gormmodel.GetTokensByFilterModel) *gorm.DB {
	filter := filterModel.Filter

	if name := lo.FromPtr(filter.Name); name != "" {
		query = query.Where(fmt.Sprintf("%s ilike ?", tokenscolumn.Name), name+"%")
	}

	if filter.UserID != nil {
		query = query.Where(fmt.Sprintf("%s = ?", tokenscolumn.UserID), *filter.UserID)
	}

	if filter.Type != nil {
		query = query.Where(fmt.Sprintf("%s = ?", tokenscolumn.Type), *filter.Type)
	}

	if filter.StartDate != nil {
		query = query.Where(fmt.Sprintf("%s >= ?", tokenscolumn.CreatedAt), *filter.StartDate)
	}
	if filter.EndDate != nil {
		query = query.Where(fmt.Sprintf("%s <= ?", tokenscolumn.CreatedAt), *filter.EndDate)
	}

	if filter.IsOnMarket != nil {
		query = query.Where(fmt.Sprintf("%s = ?", tokenscolumn.IsOnMarket), *filter.IsOnMarket)
	}

	return query
}
