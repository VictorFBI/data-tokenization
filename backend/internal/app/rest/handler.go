package rest

import (
	"github.com/gin-gonic/gin"

	restgen_user "data-tokenization/internal/gen/restgen/user"
	"data-tokenization/internal/pkg/business"
)

type TokenHandler struct {
}

// DeleteUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) DeleteUserToken(c *gin.Context) {
	panic("unimplemented")
}

// GetUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) GetUserToken(c *gin.Context, params restgen_user.GetUserTokenParams) {
	ipfsPath, err := business.GetTokenInfoByName(params.Signature, params.TokenName)
	if err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	if ipfsPath == "" {
		c.JSON(404, gin.H{"error": "Token not found"})
		return
	}

	// Trim to first 32 characters for encryption key
	encryptionKey := params.Signature[:32]

	// Read and decrypt file from IPFS
	fileContent, err := business.ReadFileFromIPFS(ipfsPath, encryptionKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{
		"content": string(fileContent),
	})
}

// GetUserTokenList implements restgen_api.ServerInterface.
func (t *TokenHandler) GetUserTokenList(c *gin.Context) {
	panic("unimplemented")
}

// PatchUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) PatchUserToken(c *gin.Context) {
	panic("unimplemented")
}

// PostUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) PostUserToken(c *gin.Context) {
	var request restgen_user.UserTokenPostRequest

	// Get file from form
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "file is required"})
		return
	}

	// Get other form fields
	request.Name = c.PostForm("name")
	request.Signature = c.PostForm("signature")
	request.Icon = restgen_user.UserTokenPostRequestIcon(c.PostForm("icon"))

	// Validate required fields
	if request.Name == "" || request.Signature == "" || request.Icon == "" {
		c.JSON(400, gin.H{"error": "name, signature and icon are required"})
		return
	}

	// Trim to first 32 characters
	encryptionKey := request.Signature[:32]

	ipfsPath, err := business.UploadFileToIPFSWithEncryption(fileHeader, encryptionKey)
	if err != nil {
		c.JSON(400, gin.H{"error": err})
		return
	}

	business.Tokenize(request.Signature, request.Name, ipfsPath)

	c.JSON(200, gin.H{
		"message":       "File uploaded successfully",
	})
}

// NewTokenHandler создает новый обработчик токенов
func NewTokenHandler() *TokenHandler {
	return &TokenHandler{}
}
