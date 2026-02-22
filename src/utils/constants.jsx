import { useSelector } from "react-redux";

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

export const ALLOWED_UPLOAD_TYPES = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

//Service Names
export const API_SERVICE = "/apiService";
export const AUTH_SERVICE = "/authService";

// API URLS
export const HOSTELLER_SAVE_OR_UPDATE_API =
  API_SERVICE +  "/api/v1/hostel/save-update-hosteller";
export const HOSTELLER_LIST_API =
  API_SERVICE + "/api/v1/hostel/get-hosteller-list";
export const HOSTELLER_GET_API = API_SERVICE + "/api/v1/hostel/get-hostellers";
export const HOSTELLER_INACTIVE_API =
  API_SERVICE + "/api/v1/hostel/inactive-hosteller";
export const HOSTELLER_TEMPLATE_API =
  API_SERVICE + "/api/v1/hostel/hostel-template";
export const HOSTELLER_BULK_UPLOAD_API =
  API_SERVICE + "/api/v1/hostel/upload-file";
export const LOGIN_API = API_SERVICE + "/authenticate/login";
export const SSO_LOGIN_API = API_SERVICE + "/authenticate/sso-login";
export const REFRESH_TOKEN_API = API_SERVICE + "/authenticate/refresh";
export const LOGOUT_API = API_SERVICE + "/authenticate/logout";

export const USER_PROFILE_API = API_SERVICE + "/api/v1/user/profile";

export const ADD = "Add";
export const EDIT = "Edit";
export const VIEW = "View";
export const DELETE = "Delete";

export const PAGINATION_MODEL = {
  page: 0,
  pageSize: 25,
};

const useAccess = (resourceId, type) => {
  const privileges = useSelector((state) => state.user.userPrivileges || []);
  return privileges.some((p) => {
    if (p.resourceId !== resourceId) return false;
    if (type === "write") return p.readWriteFlag === true;
    if (type === "read") return p.readOnlyFlag === true;
    if (type === "terminate") return p.terminateFlag === true;
    return false;
  });
};

export default useAccess;
