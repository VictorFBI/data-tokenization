package gorm

import "time"

// AddHistoryModel – модель для добавления действия пользователя
type AddHistoryModel struct {
	UserID    string
	TokenName string
	Action    HistoryAction
	CreatedAt time.Time
}
