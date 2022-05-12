import { errorType } from "../constants/errors";

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

export default getErrorCode;
