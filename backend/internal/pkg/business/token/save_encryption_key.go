package token

func (s *Service) SaveEncryptionKey(tokenName string, encryptionKey string) error {
	err := s.ec.SaveEncryptionKey(tokenName, encryptionKey)
	if err != nil {
		return err
	}

	return nil
}
