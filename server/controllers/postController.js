import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Post from "../models/Post.js";

//Add Post
export const addPost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const media = req.files;

    let media_urls = [];

    if (media.length) {
      media_urls = await Promise.all(
        media.map(async (item) => {
          const fileBuffer = fs.readFileSync(item.path);

          const response = await imagekit.files.upload({
            file: fileBuffer,
            fileName: item.originalname,
            folder: "posts",
          });

          const url = imagekit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: response.filePath,
            transformation: [
              {
                quality: auto,
                format: "webp",
                width: 1280,
              },
            ],
          });

          return url;
        }),
      );
    }

    await Post.create({
      user: userId,
      content,
      media_urls,
      post_type,
    });

    res.json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Get Posts
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.auth();
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};