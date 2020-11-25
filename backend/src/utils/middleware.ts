import { Response, NextFunction, Request } from "express";

export const unknownEndpoint = (_req: Request, res: Response): void => {
	res.status(404).send({ error: "unknown endpoint" });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err.message);
	if (err.name === "ValidationError")
		return res.status(400).send({ error: err.message });

	if (err.name === "JsonWebTokenError")
		return res.status(401).json({
			error: "invalid token",
		});

	return next(err);
};

export const tokenExtractor = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	const auth = req.get("authorization");

	const token =
		auth && auth.toLowerCase().startsWith("bearer ") && auth.substring(7);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	req.body.token = token;
	next();
};
