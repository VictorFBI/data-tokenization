package token

import (
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SaveEncryptionKeyRequest struct {
	EncryptionKey string `json:"encryption_key" binding:"required"`
	TokenName     string `json:"token_name" binding:"required"`
}

func (a *API) PostTokenEncryptionKey(c *gin.Context) {
	var req SaveEncryptionKeyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := a.s.SaveEncryptionKey(req.TokenName, req.EncryptionKey)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	c.Status(http.StatusOK)
}
