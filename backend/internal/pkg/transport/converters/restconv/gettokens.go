package restconv

import (
	"github.com/samber/lo"

	"data-tokenization/internal/gen/restgen"
	"data-tokenization/internal/pkg/model"
)

// DTOToGetTokensRequest преобразует DTO в запрос на получение токенов
func DTOToGetTokensRequest(filterProps restgen.FilterProps) model.GetTokensRequest {
	return model.GetTokensRequest{
		Filter: dtoToTokenFilter(filterProps),
	}
}

// GetTokensResponseToDTO преобразует ответ на запрос получения токенов в модель DTO
func GetTokensResponseToDTO(resp model.GetTokensResponse) []restgen.Token {
	return lo.Map(resp.Tokens, func(token model.Token, _ int) restgen.Token {
		return tokenToDTO(token)
	})
}
