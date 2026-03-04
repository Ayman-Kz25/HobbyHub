import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Story from "../models/Story.js";
import User from "../models/User.js";

//Add User Story
export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, bg_clr } = req.body;
    const media = req.file;

    let media_url = "";

    //upload media to imagekit
    if (media_type === "image" || media_type === "video") {
      const fileBuffer = fs.readFileSync(media.path);

      const response = await imagekit.files.upload({
        file: fileBuffer,
        fileName: media.originalname,
      });

      media_url = response.url;
    }

    //create story
    const story = await Story.create({
      user: userId,
      content,
      media_url,
      media_type,
      bg_clr,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, messgae: error.message });
  }
};

//Get User Story
export const getStories = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    //user friends and following
    const userIds = [userId, ...user.friends, ...user.following];

    const stories = await Story.find({
      user: { $in: userIds },
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({success: true, stories})
  } catch (error) {
    console.log(error);
    res.json({ success: false, messgae: error.message });
  }
};
