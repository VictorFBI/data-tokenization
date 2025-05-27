package user

import (
	restuser "data-tokenization/internal/gen/rest_user"
	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/service/errorhandler"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) PatchUserToken(c *gin.Context) {
	var r restuser.PatchUserTokenJSONRequestBody
	if err := c.ShouldBindJSON(&r); err != nil {
		errorhandler.Handle(c, err)
		return
	}

	updModel, err := mapper.PatchRequestToUpdateTokenModel(r)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	err = a.s.UpdateToken(updModel)
	if err != nil {
		errorhandler.Handle(c, err)
		return
	}

	c.Status(http.StatusOK)
}
