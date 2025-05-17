package gorm

// GetTokensByFilterModel – модель для получения списка токенов с фильтрацией и пагинацией
type GetTokensByFilterModel struct {
	UserID string
	Cursor int
	Limit  int
	Filter Filter
}
