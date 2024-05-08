// Cross-Origin Resource Sharing
const whiteList = ["https://www.google.com", "http://localhost:5000"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true,
};

module.exports = corsOptions;
