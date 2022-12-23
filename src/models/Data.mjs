import mongoose from "mongoose";
const { Schema } = mongoose;

const File = new Schema({
	id: String,
	name: { type: String, required: true },
	tags: [String],
});

const Folder = new Schema({
	id: String,
	name: String,
	items: [File],
});

export const Tag = new Schema({
	name: String,
	color: String,
});

export const Context = new Schema({
	totalAmount: Number,
	tags: [Tag],
	files: {
		id: String,
		name: String,
		items: [Folder],
	},
});

const DataModel = mongoose.model("Data", Context);
export default DataModel;
