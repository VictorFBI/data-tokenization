package ethereum

import (
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

func (e *EthereumClient) GetIpfsPath(tokenName string) (string, error) {
	tokenator, err := e.newTokenatorClient()
	if err != nil {
		return "", err
	}

	// Use Auth from EthereumClient to identify the caller
	callOpts := &bind.CallOpts{
		From: e.Auth.From,
	}

	ipfsPath, err := tokenator.GetPath(callOpts, tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
