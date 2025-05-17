package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) DeleteUserToken(c *gin.Context) {
	c.Status(http.StatusOK)
}
