import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

//Add Post
export const addPost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const media = req.files || [];

    let media_urls = [];

    if (media.length > 0) {

      media_urls = await Promise.all(
        media.map(async (item) => {

          const file = fs.readFileSync(item.path);
          const base64File = file.toString("base64");

          const response = await imagekit.files.upload({
            file: base64File,
            fileName: item.originalname,
            folder: "posts",
          });

          return imagekit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: response.filePath,
            transformation: [
              {
                quality: "auto",
                format: "webp",
                width: 1280,
              },
            ],
          });
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
    const user = await User.findById(userId);

    const userIds = [userId, ...user.friends, ...user.following];
    const posts = await Post.find({
      user: {$in: userIds}
    }).populate('user').sort({createdAt: -1});

    res.json({succes: true, posts});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Like Post
export const likePost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const {postId} = req.body;

    const post = await Post.findById(postId);

    if(post.likes_count.includes(userId)){
      post.likes_count = post.likes_count.filter(user => user !== userId);
      await post.save();

      res.json({success: true, message: 'Post unliked'});
    } else {
      post.likes_count.push(userId);
      await post.save();
      res.json({success: true, message: 'Post liked'});
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};