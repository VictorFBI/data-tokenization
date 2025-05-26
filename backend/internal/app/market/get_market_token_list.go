package market

import (
	"data-tokenization/internal/gen/rest_market"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetMarketTokenList(c *gin.Context, params rest_market.GetMarketTokenListParams) {
	filterModel, err := mapper.MarketFilterRequestToFilterModel(params)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}
	tokens, err := a.s.GetTokensByFilter(filterModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	resp := mapper.ToMarketTokenListResponse(tokens)
	nx := len(*resp.Tokens)
	resp.NextCursor = &nx

	c.JSON(http.StatusOK, resp)
}
