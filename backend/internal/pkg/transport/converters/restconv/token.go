package restconv

import (
	"strconv"

	"data-tokenization/internal/gen/restgen"
	"data-tokenization/internal/pkg/model"
)

// tokenToDTO преобразует токен в модель DTO
func tokenToDTO(token model.Token) restgen.Token {
	return restgen.Token{
		Icon: token.Icon,
		Id:   strconv.FormatUint(token.ID, 10),
		Name: token.Name,
	}
}
