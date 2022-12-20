import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{
			_id: user._id,
			name: user.name,
			lastname: user.lastname,
			email: user.email,
		},
		process.env.SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	const token = bearer.split(" ")[1];
	if (!token) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET);
		req.user = payload;
		console.log(payload);
		next();
	} catch (error) {
		console.error(error);
		res.status(401);
		res.send("Not authorized");
		return;
	}
};
