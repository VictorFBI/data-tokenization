package gorm

import (
	"data-tokenization/internal/pkg/model/domain"
)

type UpdateTokenModel struct {
	TokenIdentity domain.TokenIdentity
	Name          *string
	Type          *string
	Price         *float64
	CurrencyCode  *string
	Description   *string
	IsOnMarket    *bool
}
