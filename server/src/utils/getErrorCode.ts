import { errorType } from "../constants/errors";

// interface IErrorType {
//   object: {
//     message: string;
//     statusCode: number;
//   };
// }

// interface IErrorName {
//   key: String;
// }

const getErrorCode = (errorName => {
  return errorType[errorName];
};

export default getErrorCode;
