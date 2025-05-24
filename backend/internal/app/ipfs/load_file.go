package ipfs

import (
	"context"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/ipfs/boxo/files"
)

func LoadFile(c *gin.Context) {
	if ipfsErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "IPFS connection not initialized"})
		return
	}

	// Getting file from form
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Creating temp file
	tempFile, err := os.CreateTemp("", "ipfs-upload-*")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating temp file"})
		return
	}
	defer os.Remove(tempFile.Name())
	defer tempFile.Close()

	// Saving uploaded file to temp file
	// nolint
	if err := c.SaveUploadedFile(file, tempFile.Name()); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving uploaded file"})
		return
	}

	// Opening temp file for reading
	uploadedFile, err := os.Open(tempFile.Name())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error opening temp file"})
		return
	}
	defer uploadedFile.Close()

	// Creating file node
	fileNode := files.NewReaderFile(uploadedFile)

	// Uploading file to IPFS
	path, err := ipfsAPI.Unixfs().Add(context.Background(), fileNode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error adding file to IPFS"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "File uploaded successfully",
		"filename":  file.Filename,
		"size":      file.Size,
		"ipfs_path": path.String(),
	})
}
