import express from "express";
import {
  findUsers,
  followUsers,
  getUserData,
  unfollowUsers,
  updateUserData,
} from "../controllers/userController";
import { protect } from "../middlewares/auth";
import { upload } from "../configs/multer";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updateUserData,
);
userRouter.post("/find", protect, findUsers);
userRouter.post("/follow", protect, followUsers);
userRouter.post("/unfollow", protect, unfollowUsers);

export default userRouter;
