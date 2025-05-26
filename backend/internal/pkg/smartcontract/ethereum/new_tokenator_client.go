package ethereum

import (
	"data-tokenization/internal/app/config"
	"data-tokenization/internal/gen/contracts"
)

// GetTokenatorClient returns a new instance of Tokenator contract client
func (e *EthereumClient) GetTokenatorClient() (*contracts.Tokenator, error) {
	return e.newTokenatorClient()
}

func (e *EthereumClient) newTokenatorClient() (*contracts.Tokenator, error) {
	tokenator, err := contracts.NewTokenator(config.TokenatorSmartContractAddress, e.Client)
	if err != nil {
		return nil, err
	}

	return tokenator, nil
}
