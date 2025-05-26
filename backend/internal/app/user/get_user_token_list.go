package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserTokenList(c *gin.Context, params rest_user.GetUserTokenListParams) {
	filterModel, err := mapper.UserFilterRequestToFilterModel(params)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}
	tokens, err := a.s.GetTokensByFilter(filterModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	resp := mapper.ToUserTokenListResponse(tokens)
	nx := len(*resp.Tokens)
	resp.NextCursor = &nx

	c.JSON(http.StatusOK, resp)
}
