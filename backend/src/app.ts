import express from "express";
import { MONGODB_URI } from "./utils/config";
import {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
} from "./utils/middleware";

// import ea from "express-async-errors";
import helmet from "helmet";
require("express-async-errors");
import cors from "cors";
import mongoose from "mongoose";
import reviewsRouter from "./controllers/review.controller";
import { error, info } from "./utils/logger";
import usersRouter from "./controllers/users.controller";
export const mongo_uri = MONGODB_URI || "not found";

const app = express();
info(`connecting to... ${mongo_uri}`);
mongoose
	.connect(mongo_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => info("CONNECTED TO MONGODB"))
	.catch((err: Error) => error(`database err: ${err.message} `));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);

app.use(tokenExtractor);
app.use("/api/reviews", reviewsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
