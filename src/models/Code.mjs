import mongoose from "mongoose";
import { Tag } from "./Data.mjs";

const Code = mongoose.Schema({
	dataId: String,
	title: String,
	code: String,
	tag: [Tag],
});

export default mongoose.model("Code", Code);
