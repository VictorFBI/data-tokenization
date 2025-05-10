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
				Icon: lo.ToPtr("hotel"),
			},
			{
				ID:   2,
				Name: "work_2024_12",
				Icon: lo.ToPtr("briefcase"),
			},
			{
				ID:   3,
				Name: "work_2024_12",
				Icon: lo.ToPtr("briefcase"),
			},
		},
	}, nil
}
