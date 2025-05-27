package common

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"log"

	"encoding/json"

	"golang.org/x/crypto/nacl/box"
)

// generateKey generates a random 32-byte key for AES-256 (symmetric encryption)
func generateKey() ([]byte, error) {
	key := make([]byte, 32)
	if _, err := io.ReadFull(rand.Reader, key); err != nil {
		return nil, fmt.Errorf("error generating key: %v", err)
	}
	return key, nil
}

// EncryptContent encrypts the plaintext using AES-256-GCM (symmetric encryption)
func EncryptContent(content string) (string, string, error) {
	key, err := generateKey()
	if err != nil {
		return "", "", fmt.Errorf("error generating key: %v", err)
	}

	log.Println("key", base64.StdEncoding.EncodeToString(key))

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", "", fmt.Errorf("error creating cipher: %v", err)
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", "", fmt.Errorf("error creating GCM: %v", err)
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", "", fmt.Errorf("error generating nonce: %v", err)
	}

	ciphertext := gcm.Seal(nonce, nonce, []byte(content), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), string(key), nil
}

// EncryptionResult holds the encryption output in the desired format.
type EncryptionResult struct {
	Version        string `json:"version"`
	Nonce          string `json:"nonce"`
	EphemPublicKey string `json:"ephemPublicKey"`
	Ciphertext     string `json:"ciphertext"`
}

// Encrypt encrypts given message using a recipient's public key.
func EncryptForMetaMask(message string, recipientPublicKeyBase64 string) (string, error) {
	// Decode the recipient's public key from base64 to bytes
	recipientPubKeyBytes, err := base64.StdEncoding.DecodeString(recipientPublicKeyBase64)
	if err != nil {
		return "", fmt.Errorf("error decoding recipient public key: %w", err)
	}

	// Check that length of decoded key is 32 bytes
	if len(recipientPubKeyBytes) != 32 {
		return "", fmt.Errorf("invalid public key length")
	}

	// Generate ephemeral key pair
	ephemeralPub, ephemeralPriv, err := box.GenerateKey(rand.Reader)
	if err != nil {
		return "", fmt.Errorf("error generating ephemeral key: %w", err)
	}

	// Make nonce
	var nonceBytes [24]byte
	if _, err := rand.Read(nonceBytes[:]); err != nil {
		return "", fmt.Errorf("error generating nonce: %w", err)
	}

	// Encrypt the message
	recipientPublicKeyArray := new([32]byte)
	copy(recipientPublicKeyArray[:], recipientPubKeyBytes)

	ciphertextBytes := box.Seal(nil, []byte(message), &nonceBytes, recipientPublicKeyArray, ephemeralPriv)

	// Create the result structure
	result := EncryptionResult{
		Version:        "x25519-xsalsa20-poly1305",
		Nonce:          base64.StdEncoding.EncodeToString(nonceBytes[:]),
		EphemPublicKey: base64.StdEncoding.EncodeToString(ephemeralPub[:]),
		Ciphertext:     base64.StdEncoding.EncodeToString(ciphertextBytes),
	}

	// Marshal the result to JSON
	resultJSON, err := json.Marshal(result)
	if err != nil {
		return "", fmt.Errorf("json marshaling error: %w", err)
	}

	return string(resultJSON), nil
}
