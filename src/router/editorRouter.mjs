import express from "express";
const router = express.Router();

import { getData } from "../controllers/mainController.mjs";

router.post("/data", getData);

export default router;
