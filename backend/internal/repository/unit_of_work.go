package repository

import (
	userhistory "data-tokenization/internal/repository/history"
	"data-tokenization/internal/repository/token"
	"database/sql"
	"errors"

	"gorm.io/gorm"
)

type UnitOfWork struct {
	db *gorm.DB // исходный пул
	tx *gorm.DB // текущая транзакция
}

func NewUnitOfWork(db *gorm.DB) *UnitOfWork {
	return &UnitOfWork{db: db}
}

func (u *UnitOfWork) StartOperationSet(level sql.IsolationLevel) error {
	tx := u.db.Begin(&sql.TxOptions{Isolation: level})
	if tx.Error != nil {
		return tx.Error
	}
	u.tx = tx
	return nil
}

func (u *UnitOfWork) Complete() error {
	if u.tx == nil {
		return errors.New("no open transaction")
	}

	err := u.tx.Commit().Error
	u.tx = nil

	return err
}

func (u *UnitOfWork) Rollback() error {
	if u.tx == nil {
		return errors.New("no open transaction")
	}

	err := u.tx.Rollback().Error
	u.tx = nil

	return err
}

func (u *UnitOfWork) TokenRepo() token.Repo {
	if u.tx == nil {
		return token.New(u.db)
	}

	return token.New(u.tx)
}

func (u *UnitOfWork) HistoryRepo() userhistory.Repo {
	if u.tx == nil {
		return userhistory.New(u.db)
	}

	return userhistory.New(u.tx)
}
