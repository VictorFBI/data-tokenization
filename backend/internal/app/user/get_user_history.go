package user

import (
	restuser "data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	gormmodel "data-tokenization/internal/pkg/model/gorm"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) GetUserHistory(c *gin.Context, params restuser.GetUserHistoryParams) {
	historyModel := &gormmodel.ListUserHistoryModel{
		UserID: params.UserId,
		Cursor: params.Cursor,
		Limit:  params.Limit,
	}
	history, err := a.s.GetHistory(historyModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	resp := mapper.ToUserHistoryListResponse(history)
	nx := len(*resp.Tokens)
	resp.NextCursor = &nx

	c.JSON(http.StatusOK, resp)
}
