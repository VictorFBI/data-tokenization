package user

import (
	"data-tokenization/internal/pkg/smartcontract/ethereum"
	"data-tokenization/internal/repository/history"
	"data-tokenization/internal/repository/token"
	"database/sql"
)

type unitOfWork interface {
	StartOperationSet(sql.IsolationLevel) error
	Rollback() error
	Complete() error
	TokenRepo() token.Repo
	HistoryRepo() history.Repo
}

// Service - реализует бизнес слой приложения
type Service struct {
	uow unitOfWork
	ec  ethereum.Client
}

// NewService – создает новый экземпляр бизнес слоя
func NewService(uow unitOfWork, client ethereum.Client) *Service {
	return &Service{
		uow: uow,
		ec:  client,
	}
}
