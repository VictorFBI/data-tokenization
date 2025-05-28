package token

func (s *Service) GetEncryptionKey(tokenName string) (string, error) {
	encryptionKey, err := s.ec.GetEncryptionKey(tokenName)
	if err != nil {
		return "", err
	}

	return encryptionKey, nil
}
