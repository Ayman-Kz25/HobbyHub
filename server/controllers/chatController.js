import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Chat from "../models/Chat.js";

//Create an empty object to store Server-Side(SS) Event connections
const connections = {};

//Controller function for the SSE endpoint
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("New Friend Connected", userId);

  //set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  //Add the client's response object to the connections object
  connections[userId] = res;

  //Send an initial event to the client
  res.write("log: Connected to SSE stream\n\n");

  //Handle client disconnection
  req.on("close", () => {
    //Remove the client's response object from the connections array
    delete connections[userId];
    console.log("Client disconnected");
  });
};

//Send Message
export const sendMsg = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { reciever_id, text } = req.body;
    const media = req.file;

    let media_url = "";
    let msg_type = media ? "media" : "text";

    if (msg_type === "media") {
      const file = fs.readFileSync(media.path);
      const base64File = file.toString("base64");
      const response = await imagekit.files.upload({
        file: base64File,
        fileName: media.originalname,
        folder: "media",
      });

      const isVideo = media.mimetype.startsWith("video");

      media_url = imagekit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: isVideo
          ? [
              {
                quality: "auto",
              },
            ]
          : [
              {
                quality: "auto",
                format: "webp",
                width: "1280",
              },
            ],
      });
    }

    const message = await Chat.create({
      sender_id: userId,
      reciever_id,
      text,
      msg_type,
      media_url,
    });

    res.json({ success: true, message });

    //send msg to reciever using SSE
    const msgWithData = await Chat.findById(message._id).populate(
      "sender_id",
    );

    if (connections[reciever_id]) {
      connections[reciever_id].write(
        `data: ${JSON.stringify(msgWithData)}\n\n`,
      );
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Get Chat Msgs
export const getChatMsgs = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { reciever_id } = req.body;

    const msgs = await Chat.find({
      $or: [
        { sender_id: userId, reciever_id },
        { sender_id: reciever_id, reciever_id: userId },
      ],
    }).sort({ createdAt: -1 });

    // Mark Msgs as seen
    await Chat.updateMany(
      {
        sender_id: reciever_id,
        reciever_id: userId,
      },
      { seen: true },
    );

    res.json({ success: true, messages: msgs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Recent Msgs
export const getRecentMsgs = async (req, res) => {
  try {
    const { userId } = req.auth();
    const msgs = await Chat.find({ reciever_id: userId })
      .populate("sender_id reciever_id")
      .sort({ createdAt: -1 });

    res.json({ success: true, msgs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
