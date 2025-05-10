package main

import (
	"context"
	"log"
	"math/big"

	"data-tokenization/contracts"
	"data-tokenization/handlers"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"

	"github.com/gin-gonic/gin"
)

const (
	DeployerPrivateKey  = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	HardhatRpcServerUrl = "http://localhost:8545"
	BackendServerUrl    = "localhost:8081"
)

func deployContracts() {
	client, err := ethclient.Dial(HardhatRpcServerUrl)
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

	instance.Store(auth, big.NewInt(42))

	number, _ := instance.Retrieve(&bind.CallOpts{})

	log.Println("Number: ", number)
}

func main() {
	// Initializing IPFS connection
	if err := handlers.InitIPFS(); err != nil {
		log.Fatal("Failed to initialize IPFS connection:", err)
	}

	// Deploying contracts
	deployContracts()

	router := gin.Default()

	// Setting max file size (8 MB)
	router.MaxMultipartMemory = 8 << 20

	router.POST("/upload", handlers.LoadFile)

	router.Run(BackendServerUrl)
}
