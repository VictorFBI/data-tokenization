package model

// GetTokensRequest – структура запроса на получение токенов
type GetTokensRequest struct {
	Filter TokenFilter
}

// GetTokensResponse – структура ответа на запрос получения токенов
type GetTokensResponse struct {
	Tokens []Token
}
