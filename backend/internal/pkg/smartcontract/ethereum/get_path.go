package ethereum

import "github.com/ethereum/go-ethereum/accounts/abi/bind"

func (ec *EthereumClient) GetPath(tokenName string) (string, error) {
	tokenator, err := ec.newTokenatorClient()
	if err != nil {
		return "", err
	}

	ipfsPath, err := tokenator.GetPath(&bind.CallOpts{}, tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}