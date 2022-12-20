import User from "../models/User.mjs";
import { signupValidator, signinValidator } from "../auth/validation.mjs";
import { createJWT, comparePasswords, hashPassword } from "../auth/auth.mjs";

export const register = async (req, res) => {
	const body = req.body;
	console.log(body);

	// validate before continue
	const { error } = signupValidator(body);

	if (error) {
		return res.status(400).json({
			success: false,
			message: error.details[0].message,
		});
	}

	//check if the email alredy in use
	const userExists = await User.findOne({ email: body.email });
	if (userExists) {
		return res.status(400).json({
			success: false,
			message: "Email already in use",
		});
	}

	// Hash the password
	const hashedPass = await hashPassword(body.password);

	const user = new User({
		name: body.name,
		lastname: body.lastname,
		email: body.email,
		password: hashedPass,
	});

	try {
		await user.save();
		return res.status(200).json({
			success: true,
			message: "OK",
		});
	} catch (error) {
		res.status(200).json(error);
	}
};

export const login = async (req, res) => {
	const body = req.body;
	console.log(body);

	//validate before continue
	const { error } = signinValidator(body);
	console.log(error);
	if (error) {
		return res.status(400).json({
			message: error.details[0].message,
		});
	}

	// Check if the email exist
	const user = await User.findOne({ email: body.email });
	console.log(user);
	if (!user) {
		return res.status(400).json({ message: "Email does not exists" });
	}

	const validatePass = await comparePasswords(body.password, user.password);
	if (!validatePass) {
		return res.status(400).json({
			message: "Password is wrong",
		});
	}

	try {
		const token = createJWT(user);
		return res.status(200).json({
			user: {
				name: user.name,
				lastname: user.lastname,
				email: body.email,
				token,
			},
			message: "Logged in!",
		});
	} catch (error) {
		res.status(400).json({
			message: "Somethings went wrong",
		});
	}
};
