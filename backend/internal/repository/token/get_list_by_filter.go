package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
	"errors"

	"github.com/samber/lo"
)

func (r *Repository) GetListByFilter(filterModel *gorm.GetTokensByFilterModel) ([]domain.TokenInfoForList, error) {
	if filterModel == nil {
		return nil, errors.New("filterModel for GetListByFilter is nil")
	}

	filter := filterModel.Filter
	query := r.db.
		Table("tokens").
		Select("name, type, price, currency_code").
		Where("user_id = ?", filterModel.UserID)

	if name := lo.FromPtr(filter.Name); name != "" {
		query = query.Where("name ilike ?", name+"%")
	}

	if filter.Type != nil {
		query = query.Where("type = ?", *filter.Type)
	}

	if filter.StartDate != nil {
		query = query.Where("created_at >= ?", *filter.StartDate)
	}
	if filter.EndDate != nil {
		query = query.Where("created_at <= ?", *filter.EndDate)
	}

	if filter.SortDirectionOnCreatedAt != nil {
		switch *filter.SortDirectionOnCreatedAt {
		case gorm.SortDirectionAsc:
			query = query.Order("created_at ASC")
		case gorm.SortDirectionDesc:
			query = query.Order("created_at DESC")
		}
	}

	query = query.
		Limit(filterModel.Limit).
		Offset(filterModel.Cursor)

	var tokens []domain.TokenInfoForList
	if err := query.
		Find(&tokens).Error; err != nil {
		return nil, mapCommonError(err)
	}
	return tokens, nil
}
