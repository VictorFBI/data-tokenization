package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"data-tokenization/handlers"
	"data-tokenization/internal/app/rest"
	"data-tokenization/internal/gen/contracts"
	"data-tokenization/internal/gen/restgen/user"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	// "github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"

	"context"
	"log"
	"math/big"
)

const (
	DeployerPrivateKey  = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	HardhatRPCServerURL = "http://localhost:8545"
	BackendServerURL    = "localhost:8081"
)

func deployContracts() {
	client, err := ethclient.Dial(HardhatRPCServerURL)
	if err != nil {
		panic(err)
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		panic(err)
	}

	privateKey, err := crypto.HexToECDSA(DeployerPrivateKey)
	if err != nil {
		panic(err)
	}

	fmt.Printf("PUBKEY IS %s\n", privateKey.PublicKey)

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		panic(err)
	}

	address, _, _, err := contracts.DeployStorage(auth, client)
	if err != nil {
		panic(err)
	}

	log.Println("Contract deployed at address: ", address.Hex())

	instance, err := contracts.NewStorage(address, client)
	if err != nil {
		panic(err)
	}

	// nolint
	instance.Store(auth, big.NewInt(42))

	number, _ := instance.Retrieve(&bind.CallOpts{})

	log.Println("Number: ", number)
}

func main() {
	if err := handlers.InitIPFS(); err != nil {
		panic(err)
	}

	deployContracts()

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
