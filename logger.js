const winston = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const filename = path.join(logDir, 'error.log');
var options = {
    file: {
        level: 'info',
        filename: filename,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};
module.exports = logger;