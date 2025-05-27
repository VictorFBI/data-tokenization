package token

type service interface {
	SaveEncryptionKey(string, string) error
	GetEncryptionKey(string) (string, error)
	GetIpfsPath(string) (string, error)
}

type API struct {
	s service
}

func NewAPI(service service) *API {
	return &API{
		s: service,
	}
}
