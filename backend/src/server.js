// NOTE: Look at package.json for aliases.
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const _ = require("lodash");

const Logger = require("@shared/utils/Logger").default;

/** Middlewares */
const { errorHandlerMiddleware } = require("./middlewares/errorMiddleware");
const { loggerMiddleware } = require("./middlewares/loggerMiddleware");
const corsOptions = require("./config/corsOptions");

/** Routes */
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = 3001;

app.locals._ = _;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.use(cors(corsOptions));

const startServer = () => {
	/** Middlewares */
	app.use(errorHandlerMiddleware);

	if (process.env.NODE_ENV === "development") {
		/** Middlewares */
		app.use(loggerMiddleware);
		/** Routes */
		app.use("/health", healthRoutes);
	}

	/** Graceful shutdown */
	if (process.env.NODE_ENV === "production") {
		process.on("SIGTERM", () => {
			Logger.warn("SIGTERM signal received: closing HTTP server");
			server.close(() => {
				Logger.warn("HTTP server closed");
			});
		});
	}

	app.listen(PORT, () => Logger.info(`Server is running on port ${PORT}`));
};

// TODO: Call it inside the db connection.
startServer();
