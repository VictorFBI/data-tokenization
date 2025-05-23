package model

import "mime/multipart"

// Token – модель токена
type Token struct {
	ID   uint64
	Name string
	Icon *string
}

type GetUserToken struct {
	TokenName string
	Signature string
}

type UploadTokenRequest struct {
	FileHeader *multipart.FileHeader
	Icon       string
	Name       string
	Signature  string
}
