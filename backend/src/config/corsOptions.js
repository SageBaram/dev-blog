// List of allowed origins
const Logger = require("@shared/utils/Logger");

const baseUrl = "http://localhost";
const allowedOrigins = [
  `${baseUrl}:3000`,
  `${baseUrl}:3001`,
  `${baseUrl}:5000`,
  `${baseUrl}:5173`,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      Logger.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  optionsSuccessStatus: 204,
  credentials: true, // Enable credentials (cookies, http auth, etc.)
};

module.exports = corsOptions;
