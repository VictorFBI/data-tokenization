package restconv

import (
	"data-tokenization/internal/gen/rest"
	"data-tokenization/internal/pkg/model"
	"strconv"
)

// tokenToDTO преобразует токен в модель DTO
func tokenToDTO(token model.Token) restgen.Token {
	return restgen.Token{
		Icon: token.Icon,
		Id:   strconv.FormatUint(token.ID, 10),
		Name: token.Name,
	}
}
