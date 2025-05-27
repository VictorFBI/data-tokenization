package ethereum

import (
	"data-tokenization/internal/app/config"
	"data-tokenization/internal/gen/contracts"
	"log"
)

func (e *EthereumClient) DeployContract() error {
	address, _, _, err := contracts.DeployTokenator(e.Auth, e.Client)
	if err != nil {
		return err
	}

	log.Println("Contract deployed at address: ", address.Hex())

	config.TokenatorSmartContractAddress = address

	return nil
}
