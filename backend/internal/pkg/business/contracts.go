package business

import (
	"context"
	"os"

	"data-tokenization/internal/config"
	"data-tokenization/internal/gen/contracts"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func getAuth() (*bind.TransactOpts, error) {
	client, err := ethclient.Dial(os.Getenv("HARDHAT_RPC_URL"))
	if err != nil {
		return nil, err
	}

	chainID, err := client.ChainID(context.Background())
	if err != nil {
		return nil, err
	}

	privateKey, err := crypto.HexToECDSA(os.Getenv("DEPLOYER_PRIVATE_KEY"))
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
	client, err := ethclient.Dial(os.Getenv("HARDHAT_RPC_URL"))
	if err != nil {
		return err
	}

	auth, err := getAuth()
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
	client, err := ethclient.Dial(os.Getenv("HARDHAT_RPC_URL"))
	if err != nil {
		return nil, err
	}

	tokenator, err := contracts.NewTokenator(config.TokenatorSmartContractAddress, client)
	if err != nil {
		return nil, err
	}

	return tokenator, nil
}

func tokenize(signature string, tokenName string, ipfsPath string) error {
	auth, err := getAuth()
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

func getTokenInfoByName(signature string, tokenName string) (string, error) {
	auth, err := getAuth()
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
