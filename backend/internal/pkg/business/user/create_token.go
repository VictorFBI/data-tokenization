package user

import (
	"context"
	"data-tokenization/internal/pkg/common"
	"data-tokenization/internal/pkg/model/gorm"
	"database/sql"
	"encoding/base64"
	"fmt"
	"io"
	"time"

	"github.com/ipfs/boxo/files"
	"github.com/ipfs/kubo/client/rpc"
)

func (s *Service) createTokenWithHistory(tokenModel *gorm.CreateTokenModel) error {
	err := s.uow.StartOperationSet(sql.LevelReadCommitted)
	if err != nil {
		return err
	}
	defer func() {
		_ = s.uow.Rollback()
	}()

	err = s.uow.TokenRepo().Create(tokenModel)
	if err != nil {
		return err
	}

	err = s.uow.HistoryRepo().Add(&gorm.AddHistoryModel{
		UserID:    tokenModel.UserID,
		TokenName: tokenModel.Name,
		Action:    gorm.HistoryActionCreate,
		CreatedAt: time.Now(),
	})

	if err != nil {
		return err
	}

	if err := s.uow.Complete(); err != nil {
		return err
	}

	return nil
}

// CreateToken - создает токен в репозитории
func (s *Service) CreateToken(tokenModel *gorm.CreateTokenModel, fileReader io.ReadCloser, ethPublicKey string) error {
	err := s.createTokenWithHistory(tokenModel)
	if err != nil {
		return err
	}

	encryptionKey, ipfsPath, err := uploadToIPFS(fileReader)
	if err != nil {
		return err
	}

	encryptedHex, err := common.EncryptForMetaMask(encryptionKey, ethPublicKey)
	if err != nil {
		return err
	}

	err = s.ec.SavePath(tokenModel.Name, ipfsPath)
	if err != nil {
		return err
	}

	err = s.ec.SaveEncryptionKey(tokenModel.Name, encryptedHex)
	if err != nil {
		return err
	}

	return nil
}

func uploadToIPFS(fileReader io.ReadCloser) (string, string, error) {
	// Read file contents
	fileContents, err := io.ReadAll(fileReader)
	if err != nil {
		return "", "", fmt.Errorf("failed to read file contents: %w", err)
	}

	encryptedFileContents, encryptionKey, err := common.EncryptContent(string(fileContents))
	if err != nil {
		return "", "", fmt.Errorf("failed to encrypt file contents: %w", err)
	}

	encryptedFile := files.NewBytesFile([]byte(encryptedFileContents))

	// Upload to IPFS
	ipfsAPI, err := rpc.NewLocalApi()
	if err != nil {
		return "", "", fmt.Errorf("failed to connect to IPFS: %w", err)
	}

	ipfsPath, err := ipfsAPI.Unixfs().Add(context.Background(), encryptedFile)
	if err != nil {
		return "", "", fmt.Errorf("failed to upload to IPFS: %w", err)
	}

	// Return IPFS path and encryption key in base64
	return base64.StdEncoding.EncodeToString([]byte(encryptionKey)), ipfsPath.String(), nil
}
