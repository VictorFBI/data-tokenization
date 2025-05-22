package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/ethereum/go-ethereum/common"
	"github.com/joho/godotenv"
)

var (
	TokenatorSmartContractAddress common.Address
)

// LoadConfig загружает конфигурацию из .env файла
func LoadConfig() error {
	// Get the path to the backend directory
	backendDir := filepath.Join("..", "..")
	envPath := filepath.Join(backendDir, ".env")

	// Load .env file
	err := godotenv.Load(envPath)
	if err != nil {
		log.Printf("Warning: .env file not found: %v", err)
	}

	// Validate required environment variables
	requiredEnvVars := []string{
		"DEPLOYER_PRIVATE_KEY",
		"HARDHAT_RPC_URL",
	}

	for _, envVar := range requiredEnvVars {
		if os.Getenv(envVar) == "" {
			return fmt.Errorf("required environment variable %s is not set", envVar)
		}
	}

	return nil
}
