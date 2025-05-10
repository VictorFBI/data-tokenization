package rest

import (
	"context"
	"data-tokenization/internal/pkg/model"
)

type tokenService interface {
	GetTokens(context.Context, model.GetTokensRequest) (model.GetTokensResponse, error)
}

type TokenHandler struct {
	s tokenService
}

// NewTokenHandler создает новый обработчик токенов
func NewTokenHandler(service tokenService) *TokenHandler {
	return &TokenHandler{
		s: service,
	}
}
