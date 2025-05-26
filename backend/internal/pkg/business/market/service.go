package market

import (
	"data-tokenization/internal/repository/token"
)

// Service - реализует бизнес слой приложения
type Service struct {
	tokenRepo token.Repo
}

// NewService – создает новый экземпляр бизнес слоя
func NewService(tokenRepo token.Repo) *Service {
	return &Service{
		tokenRepo: tokenRepo,
	}
}
