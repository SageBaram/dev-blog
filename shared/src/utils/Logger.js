import chalk from "chalk";

class Logger {
  static formatMessage(level, message) {
    const colorMap = {
      INFO: "blue",
      WARN: "yellow",
      ERROR: "red",
      DEBUG: "green",
    };

    const color = colorMap[level];
    const timestamp = `[${new Date().toLocaleString()}] [${level}]`;
    const formattedMessage =
      typeof message === "string" ? message : JSON.stringify(message, null, 2);

    console.log(
      chalk[color](timestamp),
      chalk[`${color}Bright`](formattedMessage),
    );
  }

  static log(args) {
    this.info(args);
  }

  static info(args) {
    this.formatMessage("INFO", args);
  }

  static warn(args) {
    this.formatMessage("WARN", args);
  }

  static error(args) {
    this.formatMessage("ERROR", args);
  }
}

export default Logger;
