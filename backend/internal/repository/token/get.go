package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/tablename"
	"data-tokenization/internal/repository/schema/tokenscolumn"
	"fmt"
)

func (r *Repository) Get(tokenIdentity domain.TokenIdentity) (*domain.Token, error) {
	var t domain.Token
	query := fmt.Sprintf("%s = ? and %s = ?", tokenscolumn.UserID, tokenscolumn.Name)

	err := r.db.
		Table(tablename.Tokens).
		Where(query, tokenIdentity.UserID, tokenIdentity.Name).
		First(&t).Error

	return &t, common.MapCommonError(err)
}
