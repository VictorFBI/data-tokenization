package rest

import (
	"context"

	"github.com/gin-gonic/gin"

	"data-tokenization/internal/pkg/model"
)

type tokenService interface {
	GetTokens(context.Context, model.GetTokensRequest) (model.GetTokensResponse, error)
}

type TokenHandler struct {
	s tokenService
}

func (t TokenHandler) GetMarketTokens(c *gin.Context) {
	//TODO implement me
	panic("implement me")
}

func (t TokenHandler) UploadToken(c *gin.Context) {
	//TODO implement me
	panic("implement me")
}

// NewTokenHandler создает новый обработчик токенов
func NewTokenHandler(service tokenService) *TokenHandler {
	return &TokenHandler{
		s: service,
	}
}
