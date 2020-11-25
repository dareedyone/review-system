import User from "../models/user.model";
import express from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { toValidatedUser, toValidatedForTokenUser } from "../utils/validator";
import { UserT, SavedUser } from "../types";
import { secret } from "../utils/config";
const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
	const { username, name, password }: UserT = toValidatedUser(req.body);
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password.toString(), saltRounds);
	const savedUser = await new User({ username, name, passwordHash }).save();
	res.status(201).json(savedUser);
});

usersRouter.post("/login", async (req, res) => {
	const { username, password } = toValidatedForTokenUser(req.body);
	const user: SavedUser | null = await User.findOne({ username });
	const paswordValid =
		user && (await bcrypt.compare(password, <string>user.passwordHash));
	if (!paswordValid)
		return res.status(400).json({ error: "Invalid username or password" });
	const type = user?.type;
	const userForToken = {
		username: user?.username,
		id: user?._id,
		type,
	};
	const token = jwt.sign(userForToken, <Secret>secret);
	return res.send({ token, username: user?.username, name: user?.name, type });
});

export default usersRouter;
