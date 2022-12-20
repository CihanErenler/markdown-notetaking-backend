import mongoose from "mongoose";
import { Context } from "./Data.mjs";
const { Schema } = mongoose;

const User = new Schema({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	data: { type: Context, required: false },
});

const UserModel = mongoose.model("UserModel", User);
export default UserModel;
