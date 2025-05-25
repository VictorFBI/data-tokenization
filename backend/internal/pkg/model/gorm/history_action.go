package gorm

type HistoryAction string

const (
	HistoryActionCreated HistoryAction = "Create"
	HistoryActionSold    HistoryAction = "Sale"
	HistoryActionDeleted HistoryAction = "Deleted"
)
