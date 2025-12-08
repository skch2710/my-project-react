export const REGEX = {
  email: /\S+@\S+\.[A-Za-z]{1}\S+/,
  onlyNumbers: /^[0-9]+$/,
  alphabetsAndHypen: /^[a-zA-Z-]+(\s+[a-zA-Z-]+)*\s?$/,
  excludeLeadingAndTrailingSpaces: /^\S+(\s+\S+)*\s?$/,
  onlyFiveDigits: /^\d{5}$/,
  alphabetsWithDotHyphenExcludeLeadingAndTrailingSpaces:
    /^[\w.-]+(\s+[\w.-]+)*\s?$/,
  tenDigitNumberWithMaxTwoDecimals: /^(\d{0,10}(\.\d{0,2})?)$/,
  twoDecimalNumbers: /^(\d{0,2}(\.\d{0,2})?|100(\.00?)?)$/g,
  alphaNumericals: /^[a-zA-Z0-9]*$/,
  zipCode: /^[0-9]{1,5}$/g,
  numericWithNegativeValuesAndUptoTwoDecimal: /^(-?\d*(\.\d{0,2})?)$/g,
  shouldNotStartwithSpace: /^(?!\s).*$/,
  exceptThisSymbols: ["e", "E", "+", "-", "."],
  onlyAlphabets: /^[a-zA-Z]+(\s+[a-zA-Z]+)*\s?$/,
  numbersWithOnlyTwoDecimals: /^-?\d*\.?\d{0,2}$/,
  numericTwoDecimals: /^-?(\d{0,10}(\.\d{0,2})?)$/,
  varcharWithSpacesInBetweenWords: /^[A-Za-z0-9]+(?: ?[A-Za-z0-9]*)*$/,
};

export const DATE_FORMAT = "DD-MM-YYYY";

// API URLS
export const HOSTELLER_SAVE_OR_UPDATE_API = "/api/v1/hostel/save-update-hosteller";
export const HOSTELLER_LIST_API = "/api/v1/hostel/get-hosteller-list";
export const HOSTELLER_GET_API = "/api/v1/hostel/get-hostellers";

export const LOGIN_API = "/api/authenticate/login";
export const REFRESH_TOKEN_API = "/api/authenticate/get-jwt-refresh-token";

export const ADD = "Add";
export const EDIT = "Edit";
export const VIEW = "View";
export const DELETE = "Delete";

export const PAGINATION_MODEL = {
  page: 0,
  pageSize: 25,
};
