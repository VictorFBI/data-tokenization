package ipfs

import (
	"github.com/ipfs/kubo/client/rpc"
)

var (
	ipfsAPI *rpc.HttpApi
	ipfsErr error
)

func NewAPI() error {
	ipfsAPI, ipfsErr = rpc.NewLocalApi()
	return ipfsErr
}
