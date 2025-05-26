package user

import (
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
}

// NewService – создает новый экземпляр бизнес слоя
func NewService(uow unitOfWork) *Service {
	return &Service{
		uow: uow,
	}
}
