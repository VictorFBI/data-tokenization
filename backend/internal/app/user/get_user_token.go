package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserToken(c *gin.Context, params rest_user.GetUserTokenParams) {
	token, err := a.s.GetToken(domain.TokenIdentity{
		UserID: params.UserId,
		Name:   params.Name,
	})
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	resp := mapper.ToGetTokenResponse(*token)
	c.JSON(http.StatusOK, resp)
}
