package gorm

import "time"

// Filter – фильтр отбора данных из таблицы tokens
type Filter struct {
	UserID                   *string
	Name                     *string
	Type                     *string
	SortDirectionOnUpdatedAt *SortDirection
	StartDate                *time.Time
	EndDate                  *time.Time
	IsOnMarket               *bool
}
