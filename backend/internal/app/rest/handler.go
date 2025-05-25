package rest

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	restgen_user "data-tokenization/internal/gen/restgen/user"
	"data-tokenization/internal/pkg/model"
)

type tokenService interface {
	ReadFromIPFS(context.Context, model.GetUserToken) ([]byte, error)
	UploadToken(context.Context, model.UploadTokenRequest) error
}

type TokenHandler struct {
	ts tokenService
}

// NewTokenHandler создает новый обработчик токенов
func NewTokenHandler(ts tokenService) *TokenHandler {
	return &TokenHandler{ts: ts}
}

// DeleteUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) DeleteUserToken(c *gin.Context) {
	panic("unimplemented")
}

// GetUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) GetUserToken(c *gin.Context, params restgen_user.GetUserTokenParams) {
	fileContent, err := t.ts.ReadFromIPFS(c, model.GetUserToken(params))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
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
	req, err := makeUploadTokenRequest(c)
	if err != nil {
		return
	}

	if err = t.ts.UploadToken(c, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "File uploaded successfully",
	})
}

func makeUploadTokenRequest(c *gin.Context) (model.UploadTokenRequest, error) {
	var request restgen_user.UserTokenPostRequest

	// Get file from form
	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "file is required"})
		return model.UploadTokenRequest{}, errors.New("file is required")
	}

	// Get other form fields
	request.Name = c.PostForm("name")
	request.Signature = c.PostForm("signature")
	request.Icon = restgen_user.UserTokenPostRequestIcon(c.PostForm("icon"))

	// Validate required fields
	if request.Name == "" || request.Signature == "" || request.Icon == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name, signature and icon are required"})
		return model.UploadTokenRequest{}, errors.New("name, signature and icon are required")
	}

	req := model.UploadTokenRequest{
		FileHeader: fileHeader,
		Icon:       string(request.Icon),
		Name:       request.Name,
		Signature:  request.Signature,
	}
	return req, nil
}
