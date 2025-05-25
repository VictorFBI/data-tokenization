package business

import (
	"context"
	"errors"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/ipfs/boxo/files"
	"github.com/ipfs/boxo/path"
	"github.com/ipfs/kubo/client/rpc"

	"data-tokenization/internal/pkg/model"
	"data-tokenization/internal/pkg/common"
)

// UploadEncryptedFileToIPFS загружает зашифрованный файл в IPFS
func uploadFileToIPFSWithEncryption(fileHeader *multipart.FileHeader, encryptionKey string) (string, error) {
	// Open file
	file, err := fileHeader.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	// Read file content
	fileContent, err := io.ReadAll(file)
	if err != nil {
		return "", fmt.Errorf("failed to read file: %w", err)
	}

	// Encrypt content
	encryptedContent, err := common.EncryptAES(fileContent, []byte(encryptionKey))
	if err != nil {
		return "", fmt.Errorf("failed to encrypt file: %w", err)
	}

	// Create new file with encrypted content
	encryptedFile := files.NewBytesFile([]byte(encryptedContent))

	// Upload to IPFS
	ipfsAPI, err := rpc.NewLocalApi()
	if err != nil {
		return "", fmt.Errorf("failed to connect to IPFS: %w", err)
	}

	path, err := ipfsAPI.Unixfs().Add(context.Background(), encryptedFile)
	if err != nil {
		return "", fmt.Errorf("failed to upload to IPFS: %w", err)
	}

	// Return IPFS path and encryption key in base64
	return path.String(), nil
}

// reads and decrypts a file from IPFS
func readFileFromIPFS(ipfsPath string, encryptionKey string) ([]byte, error) {
	// Connect to IPFS
	ipfsAPI, err := rpc.NewLocalApi()
	if err != nil {
		return nil, fmt.Errorf("failed to connect to IPFS: %w", err)
	}

	// Convert string path to IPFS path
	path, err := path.NewPath(ipfsPath)
	if err != nil {
		return nil, fmt.Errorf("invalid IPFS path: %w", err)
	}

	// Get file from IPFS
	file, err := ipfsAPI.Unixfs().Get(context.Background(), path)
	if err != nil {
		return nil, fmt.Errorf("failed to get file from IPFS: %w", err)
	}

	// Get file content
	fileContent, err := io.ReadAll(file.(files.File))
	if err != nil {
		return nil, fmt.Errorf("failed to read file content: %w", err)
	}

	// Decrypt content
	decryptedContent, err := common.DecryptAES(string(fileContent), []byte(encryptionKey))
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt file: %w", err)
	}

	return decryptedContent, nil
}

func (s *service) ReadFromIPFS(_ context.Context, req model.GetUserToken) ([]byte, error) {
	ipfsPath, err := getTokenInfoByName(req.Signature, req.TokenName)
	if err != nil {
		return nil, err
	}
	if ipfsPath == "" {
		return nil, errors.New("token not found")
	}

	// Trim to first 32 characters for encryption key
	encryptionKey := req.Signature[:32]

	// Read and decrypt file from IPFS
	fileContent, err := readFileFromIPFS(ipfsPath, encryptionKey)
	return fileContent, err
}

func (s *service) UploadToken(_ context.Context, req model.UploadTokenRequest) error {
	// Trim to first 32 characters
	encryptionKey := req.Signature[:32]

	ipfsPath, err := uploadFileToIPFSWithEncryption(req.FileHeader, encryptionKey)
	if err != nil {
		return err
	}

	err = tokenize(req.Signature, req.Name, ipfsPath)
	if err != nil {
		return err
	}
	return nil
}
