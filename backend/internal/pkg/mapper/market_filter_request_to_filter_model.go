package mapper

import (
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/pkg/mapper/common"
	"data-tokenization/internal/pkg/model/gorm"
	"time"
)

func MarketFilterRequestToFilterModel(params rest_market.GetMarketTokenListParams) (*gorm.GetTokensByFilterModel, error) {
	var (
		sd      *time.Time
		ed      *time.Time
		sortDir *gorm.SortDirection
		err     error
	)
	if params.StartDate != nil {
		sd = &params.StartDate.Time
	}
	if params.EndDate != nil {
		ed = &params.EndDate.Time
	}
	if params.SortDirectionOnUpdatedAt != nil {
		sortDir, err = common.ParseSortDirectionOnUpdatedAt(*params.SortDirectionOnUpdatedAt)
	}

	iom := true
	var getTokensByFilterModel = gorm.GetTokensByFilterModel{
		Cursor: params.Cursor,
		Limit:  params.Limit,
		Filter: gorm.Filter{
			UserID:                   params.UserId,
			Name:                     params.Name,
			Type:                     params.Type,
			SortDirectionOnUpdatedAt: sortDir,
			StartDate:                sd,
			EndDate:                  ed,
			IsOnMarket:               &iom,
		},
	}

	return &getTokensByFilterModel, err
}
