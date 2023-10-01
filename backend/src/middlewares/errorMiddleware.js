const ErrorHandler = require("../services/ErrorHandler");

const errorHandlerMiddleware = async (err, req, res, next) => {
  await ErrorHandler.handle(err, req, res, next);
};

module.exports = {
  errorHandlerMiddleware,
};
