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
	)
	if token.Price != nil {
		p = fmt.Sprintf("%g", *token.Price)
	}
	if token.Description != nil {
		d = *token.Description
	}

	response := rest_user.UserTokenGetResponse{
		Token: &rest_common.Token{
			Description: d,
			FileName:    "", // TODO: добавить получение имени файла или убрать его
			Price:       p,
			TokenName:   token.Name,
			TokenType:   token.Type,
		},
	}

	return &response
}
