package business

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"
)

// EncryptAES шифрует данные с помощью AES-256-GCM
func EncryptAES(plaintext []byte, key []byte) (string, error) {
    // Создаем новый cipher block
    block, err := aes.NewCipher(key)
    if err != nil {
        return "", err
    }

    // Создаем GCM
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return "", err
    }

    // Создаем nonce
    nonce := make([]byte, gcm.NonceSize())
    if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
        return "", err
    }

    // Шифруем данные
    ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)

    // Кодируем в base64
    return base64.StdEncoding.EncodeToString(ciphertext), nil
}

// DecryptAES расшифровывает данные, зашифрованные с помощью AES-256-GCM
func DecryptAES(encryptedText string, key []byte) ([]byte, error) {
    // Декодируем из base64
    ciphertext, err := base64.StdEncoding.DecodeString(encryptedText)
    if err != nil {
        return nil, err
    }

    // Создаем новый cipher block
    block, err := aes.NewCipher(key)
    if err != nil {
        return nil, err
    }

    // Создаем GCM
    gcm, err := cipher.NewGCM(block)
    if err != nil {
        return nil, err
    }

    // Проверяем длину
    if len(ciphertext) < gcm.NonceSize() {
        return nil, errors.New("ciphertext too short")
    }

    // Извлекаем nonce
    nonce := ciphertext[:gcm.NonceSize()]
    ciphertext = ciphertext[gcm.NonceSize():]

    // Расшифровываем
    plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
    if err != nil {
        return nil, err
    }

    return plaintext, nil
}

func generateKey() ([]byte, error) {
    key := make([]byte, 32)
    if _, err := rand.Read(key); err != nil {
        return nil, err
    }
    return key, nil
}
