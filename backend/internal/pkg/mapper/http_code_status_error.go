package mapper

import (
	"net/http"

	"data-tokenization/internal/pkg/model/status"
)

var StatusErrorCodeToHTTPCode = map[status.ErrorCode]status.HTTPCode{
	status.NotFound:   http.StatusNotFound,
	status.Forbidden:  http.StatusForbidden,
	status.BadRequest: http.StatusBadRequest,
}
