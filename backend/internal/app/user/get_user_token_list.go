package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserTokenList(c *gin.Context, params rest_user.GetUserTokenListParams) {
	getTokensByFilterModel := mapper.ToGetTokensByFilterModel(params)

	tokens, err := a.s.GetTokensByFilter(getTokensByFilterModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	r := mapper.ToUserTokenListResponse(tokens)
	nx := len(*r.Tokens)
	r.NextCursor = &nx

	c.JSON(http.StatusOK, r)
}
