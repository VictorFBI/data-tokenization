package smartcontract

type Client interface {
	DeployContract() error
	SavePath(tokenName string, ipfsPath string) error
	SaveEncryptionKey(tokenName string, encryptionKey string) error
	GetEncryptionKey(tokenName string) (string, error)
}
