package token

import (
	"data-tokenization/internal/gen/rest_token"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetTokenEncryptionKey(c *gin.Context, params rest_token.GetTokenEncryptionKeyParams) {
	tokenName := params.TokenName

	encryptionKey, err := a.s.GetEncryptionKey(tokenName)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	c.JSON(http.StatusOK, &rest_token.TokenEncryptionKeyGetResponse{
		"encryption_key": encryptionKey,
	})
}
