package rest

import (
	"github.com/gin-gonic/gin"

	"data-tokenization/internal/gen/restgen"
	"data-tokenization/internal/pkg/transport/converters/restconv"
)

// GetTokens достает токены по фильтру
func (t TokenHandler) GetTokens(c *gin.Context) {
	var filterProps restgen.FilterProps
	if err := c.ShouldBindJSON(&filterProps); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	req := restconv.DTOToGetTokensRequest(filterProps)
	resp, err := t.s.GetTokens(c, req)
	if err != nil {
		c.JSON(500, gin.H{"error": "Internal server error"})
		return
	}
	tokens := restconv.GetTokensResponseToDTO(resp)

	c.JSON(200, tokens)
}
