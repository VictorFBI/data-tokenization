package smartcontract

import (
	"context"
	"data-tokenization/internal/gen/contract"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

const (
	DeployerPrivateKey  = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	HardhatRPCServerURL = "http://localhost:8545"
)

func DeployContracts() {
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

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		panic(err)
	}

	address, _, _, err := contract.DeployStorage(auth, client)
	if err != nil {
		panic(err)
	}

	log.Println("Contract deployed at address: ", address.Hex())

	instance, err := contract.NewStorage(address, client)
	if err != nil {
		panic(err)
	}

	// nolint
	_, err = instance.Store(auth, big.NewInt(42))
	if err != nil {
		return
	}

	number, _ := instance.Retrieve(&bind.CallOpts{})

	log.Println("Number: ", number)
}
