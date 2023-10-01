const Logger = require("@shared/utils/Logger").default;
const responseHandlers = require("../utils/responseHandlers");

class ErrorHandler {
	static async handle(err, req, res, next) {
		const statusCode = err.statusCode || 500;
		const message = err.message || "Internal Server Error";
		const errorCode = err.code || "INTERNAL_ERROR";
		const additionalInfo = err.additionalInfo || null;

		// Logging
		this.logError(errorCode, statusCode, message, err.stack);

		// Sending response
		const handler =
			responseHandlers[errorCode] || responseHandlers["INTERNAL_ERROR"];
		handler(res, additionalInfo);
	}

	static logError(errorCode, statusCode, message, stack) {
		if (statusCode === 500) {
			Logger.error(
				`${errorCode} - Status Code: ${statusCode}, Message: ${message}, StackTrace: ${stack}`,
			);
		} else {
			Logger.error(
				`${errorCode} - Status Code: ${statusCode}, Message: ${message}`,
			);
		}
	}
}

module.exports = { ErrorHandler };
