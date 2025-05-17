package user

import (
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
)

type tokenRepo interface {
	Get(*gormmodel.GetTokenModel) (*domain.Token, error)
	GetListByFilter(*gormmodel.GetTokensByFilterModel) ([]domain.TokenInfoForList, error)
}

// Service - реализует бизнес слой приложения
type Service struct {
	tokenRepo tokenRepo
}

// NewService – создает новый экземпляр бизнес слоя
func NewService(repo tokenRepo) *Service {
	return &Service{
		tokenRepo: repo,
	}
}
