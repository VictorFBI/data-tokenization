package token

import (
	"data-tokenization/internal/pkg/smartcontract/ethereum"
)

func (s *Service) SaveEncryptionKey(tokenName string, encryptionKey string) error {
	ethereumClient := ethereum.NewEthereumClient()

	err := ethereumClient.SaveEncryptionKey(tokenName, encryptionKey)
	if err != nil {
		return err
	}

	return nil
}
