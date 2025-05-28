package ethereum

import "github.com/ethereum/go-ethereum/accounts/abi/bind"

func (e *Client) GetPath(tokenName string) (string, error) {
	ipfsPath, err := e.TokenatorClient.GetPath(&bind.CallOpts{}, tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
