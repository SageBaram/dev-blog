const responseHandlers = {
	BAD_REQUEST: (res, additionalInfo) => {
		return res.status(400).json({
			message: "Bad request, client error",
			additionalInfo,
		});
	},
	UNAUTHORIZED: (res) => {
		return res.status(401).json({ message: "Unauthorized request" });
	},
	FORBIDDEN: (res) => {
		return res.status(403).json({ message: "Forbidden request" });
	},
	NOT_FOUND: (res) => {
		return res.status(404).json({ message: "Not Found" });
	},
	CONFLICT: (res) => {
		return res.status(409).json({ message: "Conflict" });
	},
	INTERNAL_ERROR: (res) => {
		return res.status(500).json({ message: "Internal Server Error" });
	},
};

module.exports = responseHandlers;
