import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { NonSensitiveModel } from "../types";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, minlength: 3, unique: true },
	name: String,
	passwordHash: { type: String, required: true, minlength: 3 },
	review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
	type: { type: String },
});

userSchema.plugin(mongooseUniqueValidator);

userSchema.set("toJSON", {
	transform: (_document, returnedObj: NonSensitiveModel) => {
		returnedObj.id = returnedObj?._id?.toString();
		delete returnedObj._id;
		delete returnedObj.__v;
		delete returnedObj.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);

export default User;
