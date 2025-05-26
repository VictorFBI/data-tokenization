package ethereum

import (
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

func (e *EthereumClient) GetEncryptionKey(tokenName string) (string, error) {
	tokenator, err := e.newTokenatorClient()
	if err != nil {
		return "", err
	}

	// Use Auth from EthereumClient to identify the caller
	callOpts := &bind.CallOpts{
		From: e.Auth.From,
	}

	encryptionKey, err := tokenator.GetEncryptionKey(callOpts, tokenName)
	if err != nil {
		return "", err
	}

	return encryptionKey, nil
}
