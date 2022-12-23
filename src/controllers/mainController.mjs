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

export const insertCode = async (req, res, next) => {
	const code = new Code({
		dataId: req.body.dataId,
		title: req.body.title,
		code: req.body.code,
		tags: req.body.tags,
	});
	res.status(200);
	res.json({ message: "code saved" });
	try {
		await code.save();
	} catch (error) {
		next(new Error(error));
	}
};

export const getCode = async (req, res, next) => {
	const { id } = req.params;
	try {
		const response = await Code.find({ dataId: id });
		console.log("id ===> ", id);
		console.log("response ===>", response);
		res.status(200);
		res.json({ data: response });
	} catch (error) {
		next(new Error(error));
	}
};
