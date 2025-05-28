package user

import (
	"data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/model/gorm"
	errorhandler "data-tokenization/internal/pkg/service/errorhandler"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type tokenForm struct {
	UserID       string `form:"user_id" binding:"required"`
	Name         string `form:"name" binding:"required"`
	Type         string `form:"type" binding:"required"`
	EthPublicKey string `form:"eth_public_key" binding:"required"`
	File         rest_user.File
}

func (a *API) PostUserToken(c *gin.Context) {
	var form tokenForm
	if err := c.ShouldBind(&form); err != nil {
		errorhandler.Handle(c, err)
		return
	}

	reader, err := form.File.Reader()
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	timeNow := time.Now()

	tokenModel := &gorm.CreateTokenModel{
		UserID:       form.UserID,
		Name:         form.Name,
		Type:         form.Type,
		IsOnMarket:   false,
		Price:        nil,
		CurrencyCode: nil,
		Description:  nil,
		CreatedAt:    timeNow,
		UpdatedAt:    timeNow,
	}

	err = a.s.CreateToken(tokenModel, reader, form.EthPublicKey)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	c.Status(http.StatusOK)
}
