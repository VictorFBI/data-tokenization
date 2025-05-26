package gorm

type ListUserHistoryModel struct {
	UserID string
	Cursor int
	Limit  int
}
