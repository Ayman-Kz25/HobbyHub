import express from "express";
import { upload } from "../configs/multer.js";
import { protect } from "../middlewares/auth.js";
import { addUserStory, getStories } from "../controllers/storyController.js";

const storyRouter = express.Router();

storyRouter.post("/create", protect, upload.single("media"), addUserStory);
storyRouter.get("/get", protect, getStories);

export default storyRouter