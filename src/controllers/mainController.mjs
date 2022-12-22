import User from "../models/User.mjs";

export const getData = async (req, res) => {
	try {
		const user = await User.find({ email: req.body.email });
		console.log("user ==> ", user);
		const [{ data }] = user;
		res.status(200);
		res.json(data);
	} catch (error) {
		throw new Error(error);
	}
};
