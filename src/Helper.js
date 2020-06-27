//-------------- Common helpers ---/


// Convert number to currency for display
//
// @param value integer
// @return string
export const numberToCurrency = (value) => {
	if ( ! value) {
		return '';
	}

	var refreshValue = value.replace(/,/g, "");
	return refreshValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Convert currency to number
//
// @param value string
// @return integer
export const currencyToNumber = (value) => {
	if ( ! value) {
		return '';
	}

	return value.replace(/,/g, "");
}
