package domain

import "time"

type History struct {
	UserID    string
	TokenName string
	Action    string
	CreatedAt time.Time
}
