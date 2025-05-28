package ethereum

func (e *Client) SaveEncryptionKey(tokenName string, encryptionKey string) error {
	_, err := e.TokenatorClient.SaveEncryptionKey(e.Auth, tokenName, encryptionKey)
	if err != nil {
		return err
	}

	return nil
}
