package ipfs

import (
	"log"

	"github.com/ipfs/kubo/client/rpc"
	ma "github.com/multiformats/go-multiaddr"
)

func NewAPI(ipfsAddr string) error {
	addr, err := ma.NewMultiaddr(ipfsAddr)
	if err != nil {
		log.Fatalf("invalid multiaddr: %v", err)
		return err
	}

	_, err = rpc.NewApi(addr)
	return err
}
