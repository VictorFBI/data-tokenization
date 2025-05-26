package mapper

import (
	restuser "data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/pkg/model/status"
	"fmt"
	"strconv"
)

func PatchRequestToUpdateTokenModel(r restuser.PatchUserTokenJSONRequestBody) (*gormmodel.UpdateTokenModel, error) {
	var p *float64
	if r.Price != nil {
		parsedPrice, err := strconv.ParseFloat(*r.Price, 64)
		if err != nil {
			err = &status.Err{
				Code:    status.BadRequest,
				Message: fmt.Sprintf("invalid price (%s), correct example: 1.2345", *r.Price),
			}
			return nil, err
		}
		p = &parsedPrice
	}

	response := &gormmodel.UpdateTokenModel{
		TokenIdentity: domain.TokenIdentity{
			UserID: r.UserId,
			Name:   r.Name,
		},
		Name:         r.NewName,
		Type:         r.Type,
		Price:        p,
		CurrencyCode: r.CurrencyCode,
		Description:  r.Description,
		IsOnMarket:   r.IsOnMarket,
	}

	return response, nil
}
