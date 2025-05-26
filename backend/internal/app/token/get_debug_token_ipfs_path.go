package token

import (
	"data-tokenization/internal/gen/rest_token"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetDebugTokenIpfsPath(c *gin.Context, params rest_token.GetDebugTokenIpfsPathParams) {
	ipfsPath, err := a.s.GetIpfsPath(params.TokenName)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	c.JSON(http.StatusOK, &rest_token.TokenIpfsPathGetResponse{
		"ipfs_path": ipfsPath,
	})
}
