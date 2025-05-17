package domain

// TokenInfoForList – модель для отображения основной информации о токене
type TokenInfoForList struct {
	Name         string
	Type         string
	Price        *float64
	CurrencyCode *string
}
