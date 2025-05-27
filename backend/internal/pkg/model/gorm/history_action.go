package gorm

type HistoryAction string

const (
	HistoryActionCreate HistoryAction = "Create"
	HistoryActionSale   HistoryAction = "Sale"
	HistoryActionBuy    HistoryAction = "Buy"
	HistoryActionUpdate HistoryAction = "Update"
	HistoryActionDelete HistoryAction = "Delete"
)
