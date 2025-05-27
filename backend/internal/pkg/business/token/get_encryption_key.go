package token

import (
	"data-tokenization/internal/pkg/smartcontract/ethereum"
)

func (s *Service) GetEncryptionKey(tokenName string) (string, error) {
	ethereumClient := ethereum.NewEthereumClient()

	encryptionKey, err := ethereumClient.GetEncryptionKey(tokenName)
	if err != nil {
		return "", err
	}

	return encryptionKey, nil
}
