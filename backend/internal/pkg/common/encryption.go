package common

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"

	"encoding/hex"
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

// структура, как ожидает MetaMask для eth_decrypt
type EncryptedPayload struct {
	Version     string `json:"version"`
	Nonce       string `json:"nonce"`          // base64
	EphemPubKey string `json:"ephemPublicKey"` // base64
	Ciphertext  string `json:"ciphertext"`     // base64
}

func EncryptForMetaMask(message string, recipientPublicKeyBase64 string) (string, error) {
	// Декодируем публичный ключ пользователя
	recipientPubKeyBytes, err := base64.StdEncoding.DecodeString(recipientPublicKeyBase64)
	if err != nil {
		return "", fmt.Errorf("invalid base64 pubkey: %w", err)
	}
	if len(recipientPubKeyBytes) != 32 {
		return "", fmt.Errorf("invalid public key length: %d", len(recipientPubKeyBytes))
	}

	var recipientPubKey [32]byte
	copy(recipientPubKey[:], recipientPubKeyBytes)

	// Генерируем ephemeral ключ
	pub, priv, err := box.GenerateKey(rand.Reader)
	if err != nil {
		return "", fmt.Errorf("failed to generate ephemeral key: %w", err)
	}

	// Генерируем nonce (24 байта)
	var nonce [24]byte
	if _, err := rand.Read(nonce[:]); err != nil {
		return "", fmt.Errorf("failed to generate nonce: %w", err)
	}

	// Шифруем сообщение
	encrypted := box.Seal(nil, []byte(message), &nonce, &recipientPubKey, priv)

	payload := EncryptedPayload{
		Version:     "x25519-xsalsa20-poly1305",
		Nonce:       base64.StdEncoding.EncodeToString(nonce[:]),
		EphemPubKey: base64.StdEncoding.EncodeToString(pub[:]),
		Ciphertext:  base64.StdEncoding.EncodeToString(encrypted),
	}

	// сериализуем в JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("failed to marshal JSON: %w", err)
	}

	// Hex encode
	hexOutput := hex.EncodeToString(jsonPayload)
	return "0x" + hexOutput, nil

}