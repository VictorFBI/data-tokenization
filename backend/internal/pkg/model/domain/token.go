package domain

import "time"

// Token – модель токена
type Token struct {
	UserID       string
	Name         string
	Type         string
	IsOnMarket   bool
	Price        *float64
	CurrencyCode *string
	Description  *string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
