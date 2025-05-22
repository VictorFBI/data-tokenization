package main

import (
	"github.com/gin-gonic/gin"
	"github.com/ipfs/kubo/client/rpc"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"data-tokenization/internal/app/rest"
	restgen_user "data-tokenization/internal/gen/restgen/user"

	"data-tokenization/internal/pkg/business"
)

func main() {
	_, err := rpc.NewLocalApi()
	if err != nil {
		panic(err)
	}

	business.DeployContracts()

	router := gin.Default()

	// Setting max file size (8 MB)
	router.MaxMultipartMemory = 8 << 20

	// Register the handler
	restgen_user.RegisterHandlers(router, rest.NewTokenHandler())

	// swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(
		swaggerFiles.Handler,
		ginSwagger.URL("/user.yaml"),
		ginSwagger.DefaultModelsExpandDepth(-1),
	))

	router.StaticFile("/user.yaml", "../../api/rest/user.yaml")
	router.StaticFile("/market.yaml", "../../api/rest/market.yaml")

	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
