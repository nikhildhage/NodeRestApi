//NPM mOdule imports
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

//Core NOde Modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Log Events Function

/**
 * Check if Logs folder exists
 * If not create it
 * Then check for eventLogs.txt file.
 * If eventLog.txt file exists
 * then log events
 **/

const logEvents = async (message, logName) => {
	const dateTime = `${format(new Date(), "MM-dd-yyyy \t hh:mm:ss")}`;
	const logItem = `${dateTime} \t ${uuidv4()} \t ${message} \n`;
	console.log(logItem);

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}
		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logName),
			logItem
		);
	} catch (error) {
		console.log("error");
	}
};

const logger = (req, res, next) => {
	logEvents(
		`${req.method} ${req.headers.origin} \t ${req.url} ${req.st}`,
		"reqLogs.txt"
	);
	console.log(`${req.method} ${req.path}`);
	next();
};
module.exports = { logEvents, logger };
