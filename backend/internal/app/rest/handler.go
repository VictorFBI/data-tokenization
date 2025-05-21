package rest

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/ipfs/boxo/files"
	"github.com/ipfs/kubo/client/rpc"

	restgen_user "data-tokenization/internal/gen/restgen/user"
)

type TokenHandler struct {
}

// DeleteUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) DeleteUserToken(c *gin.Context) {
	panic("unimplemented")
}

// GetUserToken implements restgen_api.ServerInterface.
func (t *TokenHandler) GetUserToken(c *gin.Context) {
	panic("unimplemented")
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
	var request restgen_user.PostUserTokenMultipartRequestBody

	// Get file from form
	request_file, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "file is required"})
		return
	}

	// Get other form fields
	request.Name = c.PostForm("name")
	request.UserId = restgen_user.UserId(c.PostForm("user_id"))
	request.Icon = restgen_user.UserTokenPostRequestIcon(c.PostForm("icon"))

	// Validate required fields
	if request.Name == "" || request.UserId == "" || request.Icon == "" {
		c.JSON(400, gin.H{"error": "name, user_id and icon are required"})
		return
	}


	// Открываем файл
	log.Println(request_file.Filename)
	file, err := request_file.Open()
	if err != nil {
		fmt.Println(err)
		c.JSON(500, gin.H{"error": "Failed to open the file"})
		return
	}
	defer file.Close()

	// Создаем новый буферизованный ридер
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		// Читать файл построчно
		log.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	ipfsAPI, err := rpc.NewLocalApi()

	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	// Creating temp file
	tempFile, err := os.CreateTemp("", "ipfs-upload-*")
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	defer os.Remove(tempFile.Name())
	defer tempFile.Close()

	// Saving uploaded file to temp file
	// nolint
	if err := c.SaveUploadedFile(request_file, tempFile.Name()); err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	// Opening temp file for reading
	uploadedFile, err := os.Open(tempFile.Name())
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	defer uploadedFile.Close()

	// Creating file node
	fileNode := files.NewReaderFile(uploadedFile)

	// Uploading file to IPFS
	path, err := ipfsAPI.Unixfs().Add(context.Background(), fileNode)
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}

	c.JSON(200, gin.H{
		"message":   "File uploaded successfully",
		"ipfs_path": path.String(),
	})
}

// NewTokenHandler создает новый обработчик токенов
func NewTokenHandler() *TokenHandler {
	return &TokenHandler{}
}
