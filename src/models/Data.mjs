import mongoose from "mongoose";
const { Schema } = mongoose;

const File = new Schema({
	id: String,
	name: { type: String, required: true },
	isSelected: { type: Boolean, default: false },
	tags: [String],
});

const Folder = new Schema({
	id: String,
	name: String,
	isOpen: { type: String, default: Boolean },
	isSelected: {
		type: String,
		default: false,
	},
	items: [File],
});

const Tag = new Schema({
	selected: { type: Boolean, default: false },
	name: String,
	color: String,
});

export const Context = new Schema({
	code: {
		type: String,
		required: false,
	},
	totalAmount: Number,
	tags: [Tag],
	files: {
		id: String,
		name: String,
		isOpen: { type: Boolean, default: false },
		items: [Folder],
	},
});

const DataModel = mongoose.model("Data", Context);
export default DataModel;
