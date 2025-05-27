package ethereum

func (ec *EthereumClient) SavePath(tokenName string, ipfsPath string) error {
	tokenator, err := ec.newTokenatorClient()
	if err != nil {
		return err
	}

	_, err = tokenator.SavePath(ec.Auth, tokenName, ipfsPath)
	if err != nil {
		return err
	}

	return nil
}
