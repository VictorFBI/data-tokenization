package token

import (
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/model/gorm"
)

func (r *Repository) Get(model *gorm.GetTokenModel) (*domain.Token, error) {
	var t domain.Token

	err := r.db.
		Where("user_id = ? and name = ?", model.UserID, model.Name).
		First(&t).Error
	if err != nil {
		return nil, mapCommonError(err)
	}

	return &t, nil
}
