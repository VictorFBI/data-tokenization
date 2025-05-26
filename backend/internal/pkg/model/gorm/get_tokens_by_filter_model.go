package gorm

// GetTokensByFilterModel – модель для получения списка токенов с фильтрацией и пагинацией
type GetTokensByFilterModel struct {
	Cursor int
	Limit  int
	Filter Filter
}
