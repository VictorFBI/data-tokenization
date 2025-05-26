package gorm

type HistoryAction string

const (
	HistoryActionCreate HistoryAction = "Create"
	HistoryActionSold   HistoryAction = "Sale"
	HistoryActionBuy    HistoryAction = "Buy"
	HistoryActionUpdate HistoryAction = "Update"
	HistoryActionDelete HistoryAction = "Delete"
)
