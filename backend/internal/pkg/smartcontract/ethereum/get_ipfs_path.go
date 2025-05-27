package ethereum

import (
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

func (e *Client) GetIpfsPath(tokenName string) (string, error) {
	callOpts := &bind.CallOpts{
		From: e.Auth.From,
	}

	ipfsPath, err := e.TokenatorClient.GetPath(callOpts, tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
