package ethereum


func (ec *EthereumClient) SaveEncryptionKey(tokenName string, encryptionKey string) error {
	tokenator, err := ec.newTokenatorClient()
	if err != nil {
		return err
	}

	_, err = tokenator.SaveEncryptionKey(ec.Auth, tokenName, encryptionKey)
	if err != nil {
		return err
	}

	return nil
}
