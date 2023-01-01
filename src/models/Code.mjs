import mongoose from "mongoose";

const Code = mongoose.Schema({
	dataId: String,
	title: String,
	code: String,
	createdAt: Date,
	updatedAt: Date,
	tags: [String],
});

export default mongoose.model("Code", Code);
