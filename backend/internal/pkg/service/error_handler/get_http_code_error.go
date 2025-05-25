package error_handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"data-tokenization/internal/pkg/mapper"
	"data-tokenization/internal/pkg/model/status"
)

func getHTTPCodeFromError(err error) status.HTTPCode {
	statusErr := &status.Err{}
	if errors.As(err, &statusErr) {
		if code, ok := mapper.StatusErrorCodeToHTTPCode[statusErr.Code]; ok {
			return code
		}
	}
	return http.StatusInternalServerError
}

func Handle(c *gin.Context, err error) {
	c.JSON(int(getHTTPCodeFromError(err)), gin.H{"Error": err.Error()})
}
