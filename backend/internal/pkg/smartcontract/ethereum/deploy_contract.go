package ethereum

import (
	"data-tokenization/internal/gen/contracts"
	"data-tokenization/internal/infra/config"
	"log"
)

func (e *Client) DeployContract(cfg *config.Config) error {
	address, _, _, err := contracts.DeployTokenator(e.Auth, e.EthClient)
	if err != nil {
		return err
	}

	log.Println("Contract deployed at address: ", address.Hex())

	cfg.Hardhat.SmartContractAddress = address

	return nil
}
