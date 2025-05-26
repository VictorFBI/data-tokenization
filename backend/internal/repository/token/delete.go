package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/repository/common"
	"data-tokenization/internal/repository/schema/tokenscolumn"
	"fmt"
)

func (r *Repository) Delete(tokenIdentity domain.TokenIdentity) (bool, error) {
	query := fmt.Sprintf("%s = ? and %s = ?", tokenscolumn.UserID, tokenscolumn.Name)

	res := r.db.
		Where(query, tokenIdentity.UserID, tokenIdentity.Name).
		Delete(&domain.Token{})

	return res.RowsAffected == 1, common.MapCommonError(res.Error)
}
