package token

import (
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/tablename"
	"data-tokenization/internal/repository/schema/tokenscolumn"
	"errors"
	"fmt"
	"time"

	"gorm.io/gorm"
)

func (r *Repository) Update(updateModel *gormmodel.UpdateTokenModel) (bool, error) {
	if updateModel == nil {
		return false, errors.New("updateModel for Update is nil")
	}

	query := r.db.
		Table(tablename.Tokens).
		Where(fmt.Sprintf("%s = ? and %s = ?", tokenscolumn.UserID, tokenscolumn.Name),
			updateModel.TokenIdentity.UserID, updateModel.TokenIdentity.Name)

	query = buildUpdate(query, updateModel)

	return query.RowsAffected == 1, common.MapCommonError(query.Error)
}

func buildUpdate(query *gorm.DB, updateModel *gormmodel.UpdateTokenModel) *gorm.DB {
	if updateModel.Type != nil {
		query = query.Update(tokenscolumn.Type, *updateModel.Type)
	}

	if updateModel.Price != nil {
		query = query.Update(tokenscolumn.Price, *updateModel.Price)
	}

	if updateModel.CurrencyCode != nil {
		query = query.Update(tokenscolumn.CurrencyCode, *updateModel.CurrencyCode)
	}

	if updateModel.Description != nil {
		query = query.Update(tokenscolumn.Description, *updateModel.Description)
	}

	if updateModel.IsOnMarket != nil {
		query = query.Update(tokenscolumn.IsOnMarket, *updateModel.IsOnMarket)
	}

	if query.RowsAffected == 1 {
		query = query.Update(tokenscolumn.UpdatedAt, time.Now())
	}

	if updateModel.Name != nil {
		query = query.Update(tokenscolumn.Name, *updateModel.Name)
	}

	return query
}
