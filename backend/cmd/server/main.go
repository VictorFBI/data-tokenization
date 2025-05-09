package main

import (
	"net/http"

	"data-tokenization/internal/gen/rest"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// PingHandler implements the ServerInterface
type PingHandler struct{}

// GetPing handles the GET /ping endpoint
func (h *PingHandler) GetPing(c *gin.Context) {
	c.JSON(http.StatusOK, rest.Pong{Ping: "pong"})
}

func main() {
	// Create a Gin router
	router := gin.Default()

	// Register the handler
	rest.RegisterHandlers(router, &PingHandler{})

	// swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(
		swaggerFiles.Handler,
		ginSwagger.URL("/api.yaml"),
		ginSwagger.DefaultModelsExpandDepth(-1),
	))

	// 3. Отдача исходного YAML
	router.StaticFile("/api.yaml", "./api/rest/api.yaml")

	// Start the server on port 8080
	router.Run(":8080")
}
