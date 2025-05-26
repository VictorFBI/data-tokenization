package common

import (
	"data-tokenization/internal/gen/rest_common"
	"data-tokenization/internal/pkg/model/gorm"
	"fmt"
)

func ParseSortDirectionOnUpdatedAt(sd rest_common.SortDirection) (*gorm.SortDirection, error) {
	var sdResp gorm.SortDirection
	switch sd {
	case rest_common.Asc:
		sdResp = gorm.SortDirectionAsc
	case rest_common.Desc:
		sdResp = gorm.SortDirectionDesc
	default:
		return nil, fmt.Errorf("invalid sort direction: %s", sd)
	}

	return &sdResp, nil
}
