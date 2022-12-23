import express from "express";
import dotenv from "dotenv";
import { createConnection } from "./db/db.mjs";
import cors from "cors";
import { protect } from "./auth/auth.mjs";

// import routes
import authRouter from "./router/authRouter.mjs";
import editorRouter from "./router/editorRouter.mjs";

// Define port
const port = process.env.PORT || 3001;

// Initialize express app
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// use routes
app.use("/api/1/user", authRouter);
app.use("/api/1/editor", protect, editorRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		name: "Markdown notetaking app api",
		version: "1.0.0",
		author: "Cihan Erenler",
	});
});
app.use((err, req, res, next) => {
	res.status(err.status).json({ message: err.message });
});

const start = async () => {
	try {
		createConnection();
		console.log("connected to db...");
		app.listen(port, () => {
			console.log(`server is running on port ${port}...`);
		});
	} catch (error) {
		throw new Error(error);
	}
};

start();
