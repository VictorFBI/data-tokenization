package gorm

import "time"

// Filter – фильтр отбора данных из таблицы tokens
type Filter struct {
	Name                     *string
	Type                     *string
	SortDirectionOnCreatedAt *SortDirection
	StartDate                *time.Time
	EndDate                  *time.Time
}
