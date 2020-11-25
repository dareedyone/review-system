/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from "express";
import { Token, ToBeSavedReview, SavedUser } from "../types";
import jwt, { Secret } from "jsonwebtoken";
import { secret } from "../utils/config";
import Review from "../models/review.model";
import User from "../models/user.model";

const reviewsRouter = Router();

reviewsRouter.get("/", async (_req, res) => {
	const reviews = await Review.find({});
	res.json(reviews);
});

reviewsRouter.post("/", async (req, res) => {
	//got token through tokenExtractor middleware

	const { text, rating, token } = req.body;

	const resolvedValue = token && jwt.verify(token, <Secret>secret);

	if (typeof resolvedValue === "string" || !resolvedValue)
		return res.status(401).json({ error: "token missing or invalid" });
	const decodedToken = <Token>resolvedValue;
	const user: SavedUser = <SavedUser>await User.findById(decodedToken.id);
	const review = new Review({
		text,
		rating,
		user: user?._id,
		status: "pending",
	});

	const savedReview: ToBeSavedReview = await review.save();
	user.review = savedReview;
	await user.save();

	return res.status(201).json(savedReview);
});
export default reviewsRouter;
