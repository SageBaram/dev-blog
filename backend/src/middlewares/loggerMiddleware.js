const Logger = require("@shared/utils/Logger").default;

const loggerMiddleware = (req, res, next) => {
	// log the request
	Logger.info(
		`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
	);

	res.on("finish", () => {
		Logger.info(
			`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`,
		);
	});
	next();
};

module.exports = {
	loggerMiddleware,
};
