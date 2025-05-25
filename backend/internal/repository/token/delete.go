package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
	"errors"
)

func (r *Repository) Delete(tokenModel *gorm.TokenModel) (bool, error) {
	if tokenModel == nil {
		return false, errors.New("tokenModel for GetListByFilter is nil")
	}

	res := r.db.
		Where("user_id = ? and name = ?", tokenModel.UserID, tokenModel.Name).
		Delete(&domain.Token{})
	if res.Error != nil {
		return false, mapCommonError(res.Error)
	}

	return res.RowsAffected == 1, nil
}
