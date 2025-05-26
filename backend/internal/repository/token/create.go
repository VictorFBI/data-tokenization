package token

import (
	"data-tokenization/internal/pkg/model/gorm"
	"errors"
)

func (r *Repository) Create(createTokenModel *gorm.CreateTokenModel) error {
	if createTokenModel == nil {
		return errors.New("CreateTokenModel for Create is nil")
	}

	res := r.db.
		Table("tokens").
		Create(createTokenModel)

	if res.Error != nil {
		return mapCommonError(res.Error)
	}

	return nil
}
