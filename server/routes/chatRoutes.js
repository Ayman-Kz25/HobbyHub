import express from "express";
import {
  getChatMsgs,
  sendMsg,
  sseController,
} from "../controllers/chatController.js";
import { upload } from "../configs/multer.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.get("/:userId", sseController);
chatRouter.post("/send", upload.single("media"), protect, sendMsg);
chatRouter.post("/get", protect, getChatMsgs);

export default chatRouter