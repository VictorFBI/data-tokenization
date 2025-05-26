package mapper

import (
	restuser "data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper/common"
	model "data-tokenization/internal/pkg/model/service"
)

func ToUserTokenListResponse(tokenInfoForList []model.TokenInfoForList) *restuser.UserListTokenResponse {
	tokenResponses := make([]restuser.TokenListItems, 0, len(tokenInfoForList))

	for _, t := range tokenInfoForList {
		tokenResponses = append(tokenResponses, restuser.TokenListItems{
			CurrencyCode: t.CurrencyCode,
			Name:         t.Name,
			Price:        common.ConvertPriceToStr(t.Price),
			Type:         t.Type,
		})
	}

	return &restuser.UserListTokenResponse{
		Tokens: &tokenResponses,
	}
}
