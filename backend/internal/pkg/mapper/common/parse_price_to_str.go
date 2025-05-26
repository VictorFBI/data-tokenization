package common

import "strconv"

func ConvertPriceToStr(number float64) string {
	return strconv.FormatFloat(number, 'g', -1, 64)
}
