package token

import "data-tokenization/internal/pkg/smartcontract/ethereum"

type Service struct {
	ec ethereum.Client
}

func NewService(client ethereum.Client) *Service {
	return &Service{
		ec: client,
	}
}
