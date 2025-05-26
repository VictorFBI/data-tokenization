package mapper

import (
	restcommon "data-tokenization/internal/gen/rest_common"
	restuser "data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
)

func ToUserHistoryListResponse(history []domain.History) *restuser.UserHistoryTokenResponse {
	tokenResponses := make([]restuser.UserHistoryItem, 0, len(history))

	for _, t := range history {
		tokenResponses = append(tokenResponses, restuser.UserHistoryItem{
			Action: t.Action,
			Date: restcommon.Date{
				Time: t.CreatedAt,
			},
			TokenName: t.TokenName,
		})
	}

	return &restuser.UserHistoryTokenResponse{
		Tokens: &tokenResponses,
	}
}
