import User from "../models/User.mjs";
import Code from "../models/Code.mjs";

export const getData = async (req, res, next) => {
	try {
		const user = await User.find({ email: req.body.email });
		const [{ data }] = user;
		res.status(200);
		res.json(data);
	} catch (error) {
		next(new Error(error));
	}
};

export const updateCode = async (req, res, next) => {
	const body = req.body;
	try {
		console.log(body.code.tags);
		const response = await Code.findOneAndUpdate(
			{ dataId: body.code.dataId },
			{
				title: body.code.title,
				code: body.code.code,
				tags: body.code.tags,
				updatedAt: body.code.updatedAt,
			}
		);
		res.status(200);
		res.json({ message: "code saved" });
	} catch (error) {
		next(new Error(error));
	}
};

export const getCode = async (req, res, next) => {
	const { id } = req.params;
	try {
		const response = await Code.find({ dataId: id });
		res.status(200);
		res.json({ data: response });
	} catch (error) {
		next(new Error(error));
	}
};

export const deleteCode = async (req, res, next) => {
	const { id } = req.params;
	try {
		await Code.findOneAndDelete({ dataId: id });
		res.status(200);
		res.json({ message: "Node deleted" });
	} catch (error) {
		next(new Error(error));
	}
};

export const handleFiles = async (req, res, next) => {
	const data = req.body;
	try {
		await User.findOneAndUpdate(
			{ email: data.email },
			{ $set: { "data.files": data.data } }
		);
		res.status(200);
		res.json({ message: "user updated" });
	} catch (error) {
		next(new Error(error));
	}
};

export const createFile = async (req, res, next) => {
	const data = req.body;
	const dataId = data.dataId;
	const title = data.title;
	console.log(dataId);

	const code = new Code({
		dataId,
		title,
		code: "### Title",
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: [],
	});

	try {
		await User.findOneAndUpdate(
			{ email: data.email },
			{ $set: { "data.files": data.data } }
		);

		await code.save();
		res.status(200);
		res.json({ message: "user updated" });
	} catch (error) {
		next(new Error(error));
	}
};
