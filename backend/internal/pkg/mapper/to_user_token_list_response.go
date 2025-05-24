package mapper

import (
	"data-tokenization/internal/gen/rest_common"
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
	"fmt"
)

func ToUserTokenListResponse(tokens []domain.TokenInfoForList) *rest_user.UserTokenListResponse {
	tokenResponses := make([]rest_common.ListTokenResponse, 0, len(tokens))

	for _, t := range tokens {
		priceStr := ""
		if t.Price != nil {
			priceStr = fmt.Sprintf("%g", *t.Price)
		}

		currency := ""
		if t.CurrencyCode != nil {
			currency = *t.CurrencyCode
		}

		tokenResponses = append(tokenResponses, rest_common.ListTokenResponse{
			TokenName:    t.Name,
			TokenType:    t.Type,
			Price:        priceStr,
			CurrencyCode: &currency,
		})
	}

	return &rest_user.UserTokenListResponse{
		Tokens: &tokenResponses,
	}
}
