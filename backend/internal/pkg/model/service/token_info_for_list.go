package service

// TokenInfoForList – модель с данными, которые необходимо знать  магазина
type TokenInfoForList struct {
	UserID       string
	Name         string
	Type         string
	Price        float64
	CurrencyCode string
}
