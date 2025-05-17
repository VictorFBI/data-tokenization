package user

import (
	"data-tokenization/internal/gen/rest_user"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserTokenDownloadLink(c *gin.Context, _ rest_user.GetUserTokenDownloadLinkParams) {
	c.JSON(http.StatusOK, rest_user.UserTokenDownloadLinkResponse{
		Link: "https://docs.google.com/spreadsheets/d/1PdtrbiHZFnrsDBgf2GNOu4aXtwpm3ZY1/edit?gid=434539901#gid=434539901",
	})
}
