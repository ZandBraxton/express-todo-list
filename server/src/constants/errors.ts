const errorName = {
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH",
  SERVER_ERROR: "SERVER_ERROR",
};
const errorType = {
  USER_ALREADY_EXISTS: {
    message: "User already exists",
    statusCode: 403,
  },
  EMAIL_ALREADY_EXISTS: {
    message: "Email already exists",
    statusCode: 403,
  },
  USER_NOT_FOUND: {
    message: "User not found",
    statusCode: 403,
  },
  PASSWORD_NOT_MATCH: {
    message: "Passwords do not match",
    statusCode: 403,
  },
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
};

export { errorName, errorType };
