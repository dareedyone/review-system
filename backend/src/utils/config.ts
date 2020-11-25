// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
export const { MONGODB_URI, PORT, SECRET } = process.env;

export const secret: string | undefined = SECRET;
