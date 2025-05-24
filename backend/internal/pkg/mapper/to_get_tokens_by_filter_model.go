package mapper

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/gorm"
	"time"
)

func ToGetTokensByFilterModel(params rest_user.GetUserTokenListParams) *gorm.GetTokensByFilterModel {
	var (
		sd *time.Time
		ed *time.Time
	)
	if params.StartDate != nil {
		sd = &params.StartDate.Time
	}
	if params.EndDate != nil {
		ed = &params.EndDate.Time
	}

	var getTokensByFilterModel = gorm.GetTokensByFilterModel{
		UserID: params.UserId,
		Cursor: params.Cursor,
		Limit:  params.Limit,
		Filter: gorm.Filter{
			Name:                     params.TokenName,
			Type:                     params.TokenType,
			SortDirectionOnCreatedAt: (*gorm.SortDirection)(params.SortDirectionOnCreatedAt),
			StartDate:                sd,
			EndDate:                  ed,
		},
	}

	return &getTokensByFilterModel
}
