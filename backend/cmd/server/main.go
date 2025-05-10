package main

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"data-tokenization/internal/app/rest"
	"data-tokenization/internal/gen/restgen"
	"data-tokenization/internal/pkg/business"
)

func main() {
	// Create a Gin router
	router := gin.Default()

	// Register the handler
	restgen.RegisterHandlers(router, rest.NewTokenHandler(business.NewService()))

	// swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(
		swaggerFiles.Handler,
		ginSwagger.URL("/api.yaml"),
		ginSwagger.DefaultModelsExpandDepth(-1),
	))

	// 3. Отдача исходного YAML
	router.StaticFile("/api.yaml", "./api/rest/api.yaml")

	// Start the server on port 8080
	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
