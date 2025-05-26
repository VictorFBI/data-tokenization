package market

import (
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/model/domain"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

func (a *API) GetMarketToken(c *gin.Context, params rest_market.GetMarketTokenParams) {
	token, err := a.s.GetToken(domain.TokenIdentity{
		UserID: params.UserId,
		Name:   params.TokenName,
	})
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	resp := mapper.ToGetTokenResponse(lo.FromPtr(token))
	c.JSON(http.StatusOK, resp)
}
