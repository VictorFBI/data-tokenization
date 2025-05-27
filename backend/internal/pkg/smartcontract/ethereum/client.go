package ethereum

import (
	"context"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

// TODO: Move to .env
const (
	DeployerPrivateKey  = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	HardhatRPCServerURL = "http://localhost:8545"
)

type EthereumClient struct {
	Client *ethclient.Client
	Auth   *bind.TransactOpts
}

func NewEthereumClient() *EthereumClient {
	client, err := ethclient.Dial(HardhatRPCServerURL)
	if err != nil {
		return nil
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		return nil
	}

	privateKey, err := crypto.HexToECDSA(DeployerPrivateKey)
	if err != nil {
		return nil
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		return nil
	}

	return &EthereumClient{Client: client, Auth: auth}
}
