package token

import (
	"data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/repository/common"
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
		return common.MapCommonError(res.Error)
	}

	return nil
}
