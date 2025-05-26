package main

import (
	"data-tokenization/internal/app/ipfs"
	marketapp "data-tokenization/internal/app/market"
	userapp "data-tokenization/internal/app/user"
	"data-tokenization/internal/db"
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/gen/rest_user"
	marketservice "data-tokenization/internal/pkg/business/market"
	userservice "data-tokenization/internal/pkg/business/user"
	"data-tokenization/internal/pkg/smartcontract"
	"data-tokenization/internal/repository"
	"log"

	"github.com/gin-gonic/gin"

	swaggerfiles "github.com/swaggo/files"
	ginswagger "github.com/swaggo/gin-swagger"
)

func main() {
	// Checking for IPFS connection
	if err := ipfs.NewAPI(); err != nil {
		log.Fatalf("ipfs api init err: %v", err)
	}

	// Deploying contracts to the blockchain network
	smartcontract.DeployContracts()

	connection := db.Connect()
	uow := repository.NewUnitOfWork(connection)
	us := userservice.NewService(uow)
	ms := marketservice.NewService(uow.TokenRepo())

	uAPI := userapp.NewAPI(us)
	mAPI := marketapp.NewAPI(ms)

	router := gin.Default()

	// Setting max file size (8 MB)
	router.MaxMultipartMemory = 8 << 20

	// Register the handler
	rest_user.RegisterHandlers(router, uAPI)
	rest_market.RegisterHandlers(router, mAPI)

	// Swagger
	router.GET("/swagger/*any", ginswagger.WrapHandler(
		swaggerfiles.Handler,
		ginswagger.URL("/common.yaml"),
		ginswagger.URL("/market.yaml"),
		ginswagger.URL("/user.yaml"),
		ginswagger.DefaultModelsExpandDepth(-1),
	))

	router.StaticFile("/user.yaml", "../../api/rest/user.yaml")
	router.StaticFile("/common.yaml", "../../api/rest/common.yaml")
	router.StaticFile("/market.yaml", "../../api/rest/market.yaml")

	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
