package token

import "data-tokenization/internal/pkg/smartcontract/ethereum"

func (s *Service) GetIpfsPath(tokenName string) (string, error) {
	ethereumClient := ethereum.NewEthereumClient()

	ipfsPath, err := ethereumClient.GetIpfsPath(tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
