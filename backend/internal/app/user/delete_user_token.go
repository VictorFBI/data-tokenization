package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/gorm"
	errorhandler "data-tokenization/internal/pkg/service/error_handler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) DeleteUserToken(c *gin.Context) {
	var r rest_user.DeleteUserTokenJSONRequestBody
	if err := c.ShouldBindJSON(&r); err != nil {
		errorhandler.Handle(c, err)
		return
	}

	success, err := a.s.DeleteToken(&gorm.TokenModel{
		UserID: r.UserId,
		Name:   r.Name,
	})
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	if success {
		c.Status(http.StatusOK)
		return
	}

	c.Status(http.StatusNotFound)
}
