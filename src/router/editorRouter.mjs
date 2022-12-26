import express from "express";
const router = express.Router();

import {
  getData,
  getCode,
  createFolder,
  createFile,
  updateCode,
} from "../controllers/mainController.mjs";

router.post("/data", getData);
router.get("/code/:id", getCode);
router.patch("/code/update", updateCode);
router.post("/folders", createFolder);
router.post("/files", createFile);

export default router;
