// Package rest_token provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.4.1 DO NOT EDIT.
package rest_token

import (
	"fmt"
	"net/http"

	externalRef0 "data-tokenization/internal/gen/rest_common"

	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
)

// TokenEncryptionKeyGetResponse defines model for TokenEncryptionKeyGetResponse.
type TokenEncryptionKeyGetResponse = map[string]interface{}

// TokenEncryptionKeyPostRequest defines model for TokenEncryptionKeyPostRequest.
type TokenEncryptionKeyPostRequest struct {
	EncryptionKey string `json:"encryption_key"`
	TokenName     string `json:"token_name"`
}

// TokenIpfsPathGetResponse defines model for TokenIpfsPathGetResponse.
type TokenIpfsPathGetResponse = map[string]interface{}

// GetDebugTokenIpfsPathParams defines parameters for GetDebugTokenIpfsPath.
type GetDebugTokenIpfsPathParams struct {
	TokenName externalRef0.TokenName `form:"token_name" json:"token_name"`
}

// GetTokenEncryptionKeyParams defines parameters for GetTokenEncryptionKey.
type GetTokenEncryptionKeyParams struct {
	TokenName externalRef0.TokenName `form:"token_name" json:"token_name"`
}

// PostTokenEncryptionKeyJSONRequestBody defines body for PostTokenEncryptionKey for application/json ContentType.
type PostTokenEncryptionKeyJSONRequestBody = TokenEncryptionKeyPostRequest

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (GET /debug/token/ipfsPath)
	GetDebugTokenIpfsPath(c *gin.Context, params GetDebugTokenIpfsPathParams)

	// (GET /token/encryptionKey)
	GetTokenEncryptionKey(c *gin.Context, params GetTokenEncryptionKeyParams)

	// (POST /token/encryptionKey)
	PostTokenEncryptionKey(c *gin.Context)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// GetDebugTokenIpfsPath operation middleware
func (siw *ServerInterfaceWrapper) GetDebugTokenIpfsPath(c *gin.Context) {

	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetDebugTokenIpfsPathParams

	// ------------- Required query parameter "token_name" -------------

	if paramValue := c.Query("token_name"); paramValue != "" {

	} else {
		siw.ErrorHandler(c, fmt.Errorf("Query argument token_name is required, but not found"), http.StatusBadRequest)
		return
	}

	err = runtime.BindQueryParameter("form", true, true, "token_name", c.Request.URL.Query(), &params.TokenName)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter token_name: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetDebugTokenIpfsPath(c, params)
}

// GetTokenEncryptionKey operation middleware
func (siw *ServerInterfaceWrapper) GetTokenEncryptionKey(c *gin.Context) {

	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetTokenEncryptionKeyParams

	// ------------- Required query parameter "token_name" -------------

	if paramValue := c.Query("token_name"); paramValue != "" {

	} else {
		siw.ErrorHandler(c, fmt.Errorf("Query argument token_name is required, but not found"), http.StatusBadRequest)
		return
	}

	err = runtime.BindQueryParameter("form", true, true, "token_name", c.Request.URL.Query(), &params.TokenName)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter token_name: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetTokenEncryptionKey(c, params)
}

// PostTokenEncryptionKey operation middleware
func (siw *ServerInterfaceWrapper) PostTokenEncryptionKey(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostTokenEncryptionKey(c)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.GET(options.BaseURL+"/debug/token/ipfsPath", wrapper.GetDebugTokenIpfsPath)
	router.GET(options.BaseURL+"/token/encryptionKey", wrapper.GetTokenEncryptionKey)
	router.POST(options.BaseURL+"/token/encryptionKey", wrapper.PostTokenEncryptionKey)
}
