package business

import (
	"context"
	restgen_user "data-tokenization/internal/gen/restgen/user"
)

// Реализует бизнес слой приложения
type service struct{}

// PostUserTokens implements rest.tokenService.
func (s *service) PostUserTokens(context.Context, restgen_user.PostUserTokenMultipartRequestBody) (restgen_user.ErrorResponse, error) {
	panic("unimplemented")
}

// NewService – создает новый экземпляр бизнес слоя
func NewService() *service {
	return &service{}
}
