package mapper

import (
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/pkg/mapper/common"
	model "data-tokenization/internal/pkg/model/service"
)

func ToMarketTokenListResponse(tokenInfoForList []model.TokenInfoForList) *rest_market.MarketListTokenResponse {
	tokenResponses := make([]rest_market.TokenListItems, 0, len(tokenInfoForList))

	for _, t := range tokenInfoForList {
		tokenResponses = append(tokenResponses, rest_market.TokenListItems{
			CurrencyCode: t.CurrencyCode,
			Name:         t.Name,
			Price:        common.ConvertPriceToStr(t.Price),
			Type:         t.Type,
			UserId:       t.UserID,
		})
	}

	return &rest_market.MarketListTokenResponse{
		Tokens: &tokenResponses,
	}
}
