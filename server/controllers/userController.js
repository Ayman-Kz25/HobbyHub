import imagekit from "../configs/imageKit.js";
import Friends from "../models/Friends.js";
import User from "../models/User.js";
import fs from "fs";

// Get User Data using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found!" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update User Data using userId
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { user_name, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);

    !user_name && (user_name = tempUser.user_name);

    if (tempUser.user_name !== user_name) {
      const user = await User.findOne({user_name});
      if (user) {
        user_name = tempUser.user_name;
      }
    }

    const updatedData = {
      user_name,
      bio,
      location,
      full_name,
    };

    const profile = req.files.profile && req.files.profile[0];

    const cover = req.files.cover && req.files.cover[0];

    if (profile) {
      const response = await imagekit.files.upload({
        file: fs.createReadStream(profile.path),
        fileName: profile.originalname,
      });

      const url = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          {
            width: 512,
            quality: 80,
            format: "webp",
          },
        ],
      });

      updatedData.profile_pic = url;

      fs.unlinkSync(profile.path);
    }

    if (cover) {
      const response = await imagekit.files.upload({
        file: fs.createReadStream(cover.path),
        fileName: cover.originalname,
      });

      const url = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          {
            quality: "auto",
            format: "webp",
            width: "1280",
          },
        ],
      });
      updatedData.cover_photo = url;
      fs.unlinkSync(cover.path);
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json({ success: true, user, message: "Profile updated successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Find users using username, email, location, name
export const findUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        { user_name: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });

    const filteredUser = allUsers.filter((user) => user._id !== userId);

    res.json({ success: true, users: filteredUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Follow User
export const followUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "Already added to your following list",
      });
    }

    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);

    await toUser.save();

    res.json({ succes: true, message: "Added to your following list" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Unfollow User
export const unfollowUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    user.following = user.following.filter((user) => user !== id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers = toUser.followers.filter((user) => user !== userId);
    await user.save();

    res.json({ succes: true, message: "Removed from your following list" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Send Friend Request
export const sendFriendRequest = async (req, res) => {
  try {
    const {userId} = req.auth();
    const {id} = req.body;

    //can send only 20 req within 24 hours
    const last24hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const friendRequests = await Friends.find({
      sender_id: userId, createdAt: {$gt: last24hrs}
    })

    if(friendRequests.length >= 20){
      return res.json({success: false, message: 'You can send 20 requests within 24 hours!'});
    }

    //check if user is already friend
    const friend = await Friends.findOne({
      $or: [
        {sender_id: userId, receiver_id: id},
        {sender_id: id, receiver_id: userId},
      ]
    });

    if(!friend){
      await Friends.create({
        sender_id: userId,
        receiver_id: id
      })
      return res.json({success: true, message: 'Friend request sent'});
    } else if(friend && friend.status === 'accepted'){
       return res.json({success: false, message: 'Already added to your friend list!'});
    }

    return res.json({success: false, message: 'Friend request pending!'});

  } catch (error) {
    console.log(error)
    res.json({success: false, messgae: error.message});
  }
}