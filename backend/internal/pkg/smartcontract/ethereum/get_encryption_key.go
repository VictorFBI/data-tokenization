package ethereum

import (
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

func (e *Client) GetEncryptionKey(tokenName string) (string, error) {
	callOpts := &bind.CallOpts{
		From: e.Auth.From,
	}

	encryptionKey, err := e.TokenatorClient.GetEncryptionKey(callOpts, tokenName)
	if err != nil {
		return "", err
	}

	return encryptionKey, nil
}
