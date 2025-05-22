package business

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/ipfs/boxo/files"
	"github.com/ipfs/boxo/path"
	"github.com/ipfs/kubo/client/rpc"
)

// UploadEncryptedFileToIPFS загружает зашифрованный файл в IPFS
func UploadFileToIPFSWithEncryption(fileHeader *multipart.FileHeader, encryptionKey string) (string, error) {
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
	encryptedContent, err := EncryptAES(fileContent, []byte(encryptionKey))
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

// ReadFileFromIPFS читает и расшифровывает файл из IPFS
func ReadFileFromIPFS(ipfsPath string, encryptionKey string) ([]byte, error) {
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
	decryptedContent, err := DecryptAES(string(fileContent), []byte(encryptionKey))
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt file: %w", err)
	}

	return decryptedContent, nil
}
