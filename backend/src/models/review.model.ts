import mongoose from "mongoose";
import { NonSensitiveModel } from "../types";
const reviewSchema = new mongoose.Schema({
	text: { type: String, required: true, minlength: 2 },
	rating: { type: Number, required: true, minlength: 0, maxlength: 5 },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	status: { type: String },
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(),
		required: true,
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(),
		required: true,
	},
});

reviewSchema.set("toJSON", {
	transform: (_document, returnedObj: NonSensitiveModel) => {
		returnedObj.id = returnedObj?._id?.toString();
		delete returnedObj._id;
		delete returnedObj.__v;
	},
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
