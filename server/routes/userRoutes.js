import express from "express";
import {
  acceptFriendRequest,
  findUsers,
  followUsers,
  getFriendRequest,
  getUserData,
  getUserProfiles,
  sendFriendRequest,
  unfollowUsers,
  updateUserData,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";
import { getRecentMsgs } from "../controllers/chatController.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updateUserData,
);
userRouter.post("/find", protect, findUsers);
userRouter.post("/follow", protect, followUsers);
userRouter.post("/unfollow", protect, unfollowUsers);
userRouter.post("/connect", protect, sendFriendRequest);
userRouter.post("/accept", protect, acceptFriendRequest);
userRouter.get("/friends", protect, getFriendRequest);
userRouter.post("/profiles", getUserProfiles);
userRouter.get("/recent-chat", protect, getRecentMsgs);

export default userRouter;
