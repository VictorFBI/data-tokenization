package ethereum

import (
	"context"
	"data-tokenization/internal/gen/contracts"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

type Client struct {
	EthClient       *ethclient.Client
	Auth            *bind.TransactOpts
	TokenatorClient *contracts.Tokenator
}

func NewClient(url string, dplPrvKey string, addrSmartContract common.Address) (*Client, error) {
	client, err := ethclient.Dial(url)
	if err != nil {
		return nil, err
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		return nil, err
	}

	privateKey, err := crypto.HexToECDSA(dplPrvKey)
	if err != nil {
		return nil, err
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		return nil, err
	}

	tokenator, err := contracts.NewTokenator(addrSmartContract, client)
	if err != nil {
		return nil, err
	}

	return &Client{EthClient: client, Auth: auth, TokenatorClient: tokenator}, nil
}
