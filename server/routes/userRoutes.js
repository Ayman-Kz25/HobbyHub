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
userRouter.get("/pending", protect, getFriendRequest);
userRouter.post("/profiles", getUserProfiles);

export default userRouter;
