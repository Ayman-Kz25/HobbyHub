import express from "express";
import { upload } from "../configs/multer.js";
import { protect } from "../middlewares/auth.js";
import {
  addPost,
  getFeedPosts,
  likePost,
  getLikedPost,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post("/add", upload.array("media", 4), protect, addPost);
postRouter.get("/feed", protect, getFeedPosts);
postRouter.post("/like", protect, likePost);
postRouter.get("/liked", protect, getLikedPost);

export default postRouter;
