package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) DeleteUserToken(c *gin.Context) {
	var r rest_user.DeleteUserTokenJSONRequestBody
	if err := c.ShouldBindJSON(&r); err != nil {
		errorhandler.Handle(c, err)
		return
	}

	success, err := a.s.DeleteToken(domain.TokenIdentity{
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
