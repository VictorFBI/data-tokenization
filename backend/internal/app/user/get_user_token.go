package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserToken(c *gin.Context, params rest_user.GetUserTokenParams) {
	getTokenModel := gorm.GetTokenModel{
		UserID: params.UserId,
		Name:   params.TokenName,
	}

	token, err := a.s.GetToken(&getTokenModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	r := mapper.ToUserTokenGetResponse(*token)

	c.JSON(http.StatusOK, r)
}
