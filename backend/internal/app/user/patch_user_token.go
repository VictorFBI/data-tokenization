package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) PatchUserToken(c *gin.Context) {
	c.Status(http.StatusOK)
}
