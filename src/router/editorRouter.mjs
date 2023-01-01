import express from "express";
const router = express.Router();

import {
	getData,
	getCode,
	handleFiles,
	createFile,
	updateCode,
	deleteCode,
} from "../controllers/mainController.mjs";

router.post("/data", getData);
router.get("/code/:id", getCode);
router.post("/code/update", updateCode);
router.post("/folders", handleFiles);
router.post("/files", createFile);
router.delete("/code/:id", deleteCode);

export default router;
