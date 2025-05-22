package business

import (
	"context"
	"data-tokenization/internal/app/config"
	"data-tokenization/internal/gen/contracts"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

const (
	DeployerPrivateKey  = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
	HardhatRPCServerURL = "http://localhost:8545"
)

func GetAuth() (*bind.TransactOpts, error) {
	client, err := ethclient.Dial(HardhatRPCServerURL)
	if err != nil {
		return nil, err
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		return nil, err
	}

	privateKey, err := crypto.HexToECDSA(DeployerPrivateKey)
	if err != nil {
		return nil, err
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		return nil, err
	}

	return auth, nil
}

func DeployContracts() error {
	client, err := ethclient.Dial(HardhatRPCServerURL)
	if err != nil {
		return err
	}

	auth, err := GetAuth()
	if err != nil {
		return err
	}

	address, _, _, err := contracts.DeployTokenator(auth, client)
	if err != nil {
		return err
	}

	config.TokenatorSmartContractAddress = address

	return nil
}

func newTokenatorClient() (*contracts.Tokenator, error) {
	client, err := ethclient.Dial(HardhatRPCServerURL)
	if err != nil {
		return nil, err
	}

	tokenator, err := contracts.NewTokenator(config.TokenatorSmartContractAddress, client)
	if err != nil {
		return nil, err
	}

	return tokenator, nil
}

func Tokenize(signature string, tokenName string, ipfsPath string) error {
	auth, err := GetAuth()
	if err != nil {
		return err
	}

	tokenator, err := newTokenatorClient()
	if err != nil {
		return err
	}

	_, err = tokenator.Tokenize(auth, signature, tokenName, ipfsPath)
	if err != nil {
		return err
	}

	return nil
}

func GetTokenInfoByName(signature string, tokenName string) (string, error) {
	auth, err := GetAuth()
	if err != nil {
		return "", err
	}

	tokenator, err := newTokenatorClient()
	if err != nil {
		return "", err
	}

	ipfsPath, err := tokenator.GetTokenPathBySignatureAndName(&bind.CallOpts{From: auth.From}, signature, tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
