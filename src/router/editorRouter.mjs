import express from "express";
const router = express.Router();

import { getData, getCode } from "../controllers/mainController.mjs";

router.post("/data", getData);
router.get("/code/:id", getCode);

export default router;
