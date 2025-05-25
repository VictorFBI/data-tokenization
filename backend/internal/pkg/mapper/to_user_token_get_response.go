package mapper

import (
	"data-tokenization/internal/gen/rest_common"
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
	"fmt"
)

func ToUserTokenGetResponse(token domain.Token) *rest_user.UserTokenGetResponse {
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

	response := rest_user.UserTokenGetResponse{
		Token: &rest_common.Token{
			Description:  d,
			Price:        p,
			Name:         token.Name,
			Type:         token.Type,
			CurrencyCode: c,
		},
	}

	return &response
}
