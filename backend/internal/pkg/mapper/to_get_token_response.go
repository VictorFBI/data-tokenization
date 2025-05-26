package mapper

import (
	"data-tokenization/internal/gen/rest_common"
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
	"fmt"
)

func ToGetTokenResponse(token domain.Token) *rest_user.UserGetTokenResponse {
	var (
		p string
		d string
		c string
	)
	if token.Price != nil {
		p = fmt.Sprintf("%g", *token.Price)
	}
	if token.Description != nil {
		d = *token.Description
	}
	if token.CurrencyCode != nil {
		c = *token.CurrencyCode
	}

	response := rest_user.UserGetTokenResponse{
		Token: &rest_common.Token{
			Name:         token.Name,
			Type:         token.Type,
			Price:        p,
			CurrencyCode: c,
			Description:  d,
			IsOnMarket:   token.IsOnMarket,
		},
	}

	return &response
}
