package common

import (
	"errors"

	"gorm.io/gorm"

	"data-tokenization/internal/pkg/model/status"
)

func MapCommonError(err error) error {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return status.New(status.NotFound, err.Error())
	}
	return err
}
