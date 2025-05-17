package token

import (
	"errors"

	"gorm.io/gorm"

	"data-tokenization/internal/pkg/model/status"
)

func mapCommonError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return status.New(status.NotFound, err.Error())
	}
	return err
}
