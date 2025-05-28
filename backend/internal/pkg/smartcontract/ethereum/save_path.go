package ethereum

func (e *Client) SavePath(tokenName string, ipfsPath string) error {
	_, err := e.TokenatorClient.SavePath(e.Auth, tokenName, ipfsPath)
	if err != nil {
		return err
	}

	return nil
}
