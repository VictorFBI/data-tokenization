package token

func (s *Service) GetIpfsPath(tokenName string) (string, error) {
	ipfsPath, err := s.ec.GetIpfsPath(tokenName)
	if err != nil {
		return "", err
	}

	return ipfsPath, nil
}
