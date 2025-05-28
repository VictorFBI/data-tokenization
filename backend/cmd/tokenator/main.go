package main

import (
	"data-tokenization/internal/app/ipfs"
	marketapp "data-tokenization/internal/app/market"
	tokenapp "data-tokenization/internal/app/token"
	userapp "data-tokenization/internal/app/user"
	"data-tokenization/internal/db"
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/gen/rest_token"
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/infra/config"
	marketservice "data-tokenization/internal/pkg/business/market"
	tokenservice "data-tokenization/internal/pkg/business/token"
	userservice "data-tokenization/internal/pkg/business/user"
	"data-tokenization/internal/pkg/smartcontract/ethereum"
	"data-tokenization/internal/repository"
	"fmt"
	"log"
	"os"

	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerfiles "github.com/swaggo/files"
	ginswagger "github.com/swaggo/gin-swagger"
)

func main() {
	configImpl, err := config.LoadConfig(os.Getenv("CONFIG_FILE"))
	if err != nil {
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Fatal("Error loading .env file")
		}
		configImpl, err = config.LoadConfig(os.Getenv("CONFIG_FILE"))

		panic(fmt.Errorf("config.LoadConfig: %w", err))
	}

	// Checking for IPFS connection
	if err = ipfs.NewAPI(configImpl.Ipfs.HTTPEndpoint); err != nil {
		panic(fmt.Errorf("ipfs api init err: %w", err))
	}

	// Checking for Ethereum connection
	_, err = ethclient.Dial(configImpl.Hardhat.HTTPEndpoint)
	if err != nil {
		panic(fmt.Errorf("checking ethereum connect failed with err: %w", err))
	}

	cfgHardhat := configImpl.Hardhat
	ethereumClient, err := ethereum.NewClient(
		cfgHardhat.HTTPEndpoint,
		cfgHardhat.DeployerPrivateKey,
		cfgHardhat.SmartContractAddress)
	if err != nil {
		panic(fmt.Errorf("init ethereum client failed with err: %w", err))
	}

	// Deploying contracts to the blockchain network
	err = ethereumClient.DeployContract(configImpl)
	if err != nil {
		panic(fmt.Errorf("deploy contract to the blockchain network failed with err: %w", err))
	}

	connection := db.Connect(configImpl.Postgres.URL)
	uow := repository.NewUnitOfWork(connection)

	us := userservice.NewService(uow, *ethereumClient)
	ts := tokenservice.NewService(*ethereumClient)
	ms := marketservice.NewService(uow.TokenRepo())

	uAPI := userapp.NewAPI(us)
	tAPI := tokenapp.NewAPI(ts)
	mAPI := marketapp.NewAPI(ms)

	router := gin.Default()

	settingSwagger(router, configImpl.Server.HTTPEndpoint)

	// Register the handler
	rest_user.RegisterHandlers(router, uAPI)
	rest_market.RegisterHandlers(router, mAPI)
	rest_token.RegisterHandlers(router, tAPI)

	router.Static("/tokenator", "./api/rest")

	// Swagger
	router.GET("/swagger/*any", ginswagger.WrapHandler(
		swaggerfiles.Handler,
		ginswagger.URL("/tokenator/common.yaml"),
		ginswagger.URL("/tokenator/token.yaml"),
		ginswagger.URL("/tokenator/market.yaml"),
		ginswagger.URL("/tokenator/user.yaml"),
		ginswagger.DefaultModelsExpandDepth(-1),
	))

	if err := router.Run(fmt.Sprintf(":%s", configImpl.Server.Port)); err != nil {
		panic(fmt.Errorf("run swagger failed with err: %w", err))
	}
}

func settingSwagger(router *gin.Engine, allowEndPoint string) {
	// Enables CORS to allow requests from localhost:8080 with any method, headers, and credentials.
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{allowEndPoint},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	// Setting max file size - 8 MB
	router.MaxMultipartMemory = 8 << 20
}
