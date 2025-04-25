package main

import (
	"data-tokenization/backend/handlers"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initializing IPFS connection
	if err := handlers.InitIPFS(); err != nil {
		log.Fatal("Failed to initialize IPFS connection:", err)
	}

	router := gin.Default()

	// Setting max file size (8 MB)
	router.MaxMultipartMemory = 8 << 20

	router.POST("/upload", handlers.LoadFile)

	router.Run("localhost:8081")
}
