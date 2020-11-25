import { Document } from "mongoose";

// import mongoose, { Document } from "mongoose";
export interface UserT {
	name: string;
	username: string;
	password: string;
}

export type ForTokenUser = Omit<UserT, "name">;

export interface Token {
	id: string;
	type: string;
}
export interface ToBeSavedReview extends Document {
	text?: string;
	rating?: number;
	token?: string;
	user?: Document | null;
	status?: string;
}

export interface SavedUser extends Document {
	name?: string;
	username?: string;
	passwordHash?: string;
	review?: Document;
	_id: string;
	type?: string;
}

export interface NonSensitiveModel {
	_id?: string;
	id?: string;
	__v?: string;
	passwordHash?: string;
}
