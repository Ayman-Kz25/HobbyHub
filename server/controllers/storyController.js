import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";

//Add User Story
export const addUserStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, bg_clr } = req.body;
    const media = req.file;

    let media_url = "";

    //upload media to imagekit
    if ((media_type === "image" || media_type === "video") && media) {
      const fileBuffer = fs.readFileSync(media.path);
      const base64File = fileBuffer.toString("base64");

      const response = await imagekit.files.upload({
        file: base64File,
        fileName: media.originalname,
        folder: "stories",
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

    //Schedule story deletion after 24 hours
    try {
      await inngest.send({
      name: "app/story.delete",
      data: { storyId: story._id },
    });
    } catch (error) {
      console.log("Inngest Event failed:", error.message);
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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

    res.json({ success: true, stories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
