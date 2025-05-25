package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
	"errors"
)

func (r *Repository) Get(tokenModel *gorm.TokenModel) (*domain.Token, error) {
	if tokenModel == nil {
		return nil, errors.New("tokenModel for GetListByFilter is nil")
	}

	var t domain.Token

	err := r.db.
		Table("tokens").
		Where("user_id = ? and name = ?", tokenModel.UserID, tokenModel.Name).
		First(&t).Error
	if err != nil {
		return nil, mapCommonError(err)
	}

	return &t, nil
}
