package status

type ErrorCode int

const (
	Unknown ErrorCode = iota
	NotFound
)

type Err struct {
	Code    ErrorCode
	Message string
}

func New(code ErrorCode, message string) *Err {
	return &Err{
		Code:    code,
		Message: message,
	}
}

func (e *Err) Error() string {
	return e.Message
}
