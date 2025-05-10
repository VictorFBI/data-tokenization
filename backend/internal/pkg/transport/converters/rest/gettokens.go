package restconv

import (
	restgen "data-tokenization/internal/gen/rest"
	"data-tokenization/internal/pkg/model"
	"github.com/samber/lo"
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
