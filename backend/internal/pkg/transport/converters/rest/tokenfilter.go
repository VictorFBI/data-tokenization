package restconv

import (
	"data-tokenization/internal/gen/rest"
	"data-tokenization/internal/pkg/model"
)

// dtoToTokenFilter преобразует DTO в фильтр токенов
func dtoToTokenFilter(dto restgen.FilterProps) model.TokenFilter {
	var search *string
	if dto.Search != nil {
		search = dto.Search
	}
	return model.TokenFilter{
		Search: search,
		Sort:   convertSortDirection(dto.Sort),
	}
}

func convertSortDirection(sort *restgen.FilterPropsSort) model.SortDirection {
	if sort == nil {
		return model.SortDirectionAsc
	}
	switch *sort {
	case restgen.Asc:
		return model.SortDirectionAsc
	case restgen.Desc:
		return model.SortDirectionDesc
	default:
		return model.SortDirectionAsc
	}
}
