package business

import (
	"context"

	"github.com/samber/lo"

	"data-tokenization/internal/pkg/model"
)

// GetTokens возвращает список токенов
func (s *service) GetTokens(_ context.Context, _ model.GetTokensRequest) (model.GetTokensResponse, error) {
	return model.GetTokensResponse{
		Tokens: []model.Token{
			{
				ID:   1,
				Name: "sleep_2024_12",
				Icon: lo.ToPtr("hotel")},
			{
				ID:   2,
				Name: "fat_percent_2024_11",
				Icon: lo.ToPtr("pie-chart")},
			{
				ID:   3,
				Name: "heart_rate_12",
				Icon: lo.ToPtr("favorite")},
			{
				ID:   4,
				Name: "oxygen_saturation_rate",
				Icon: lo.ToPtr("air")},
		},
	}, nil
}
