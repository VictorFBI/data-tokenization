package main

import (
	"context"
	"log"
	"math/big"

	"data-tokenization/backend/contracts"
	"data-tokenization/backend/handlers"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"

	"github.com/gin-gonic/gin"
)

func deployContracts() {
	client, err := ethclient.Dial(HARDHAT_RPC_SERVER_URL)
	if err != nil {
		panic(err)
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		panic(err)
	}

	privateKey, err := crypto.HexToECDSA(DEPLOYER_PRIVATE_KEY)
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

	router.Run(BACKEND_SERVER_URL)
}
