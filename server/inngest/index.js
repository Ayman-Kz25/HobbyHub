import { Inngest } from "inngest";
import User from "../models/User.js";
import Friend from "../models/Friend.js";
import sendMail from "../configs/nodeMailer.js";
import Story from "../models/Story.js";
import Chat from "../models/Chat.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "hobbyhub-app" });

// Inngest function to save the user data to the database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let user_name = email_addresses[0].email_address.split("@")[0];

    // Check username availability
    const user = await User.findOne({ user_name });

    if (user) {
      user_name = user_name + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_pic: image_url,
      user_name,
    };

    await User.create(userData);
  },
);

// Ingest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updateUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_pic: image_url,
    };

    await User.findByIdAndUpdate(id, updateUserData);
  },
);

// Ingest function to delete user data in database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.delete" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

//Ingest function to send remainder when new friend is added
const sendNewFriendRequestRemainder = inngest.createFunction(
  { id: "send-new-friend-request-remainder" },
  { event: "app/friend-request" },
  async ({ event, step }) => {
    const { friendId } = event.data;

    await step.run("send-friend-request-mail", async () => {
      const friend = await Friend.findById(friendId).populate(
        "sender_id receiver_id",
      );

      const subject = "You’ve received a new friend request on HobbyHub 🤝";

      const body = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Friend Request</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#1f2937;">HobbyHub 🤝</h2>
              </td>
            </tr>

            <tr>
              <td style="color:#374151; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${friend.receiver_id.full_name}</strong>,</p>

                <p>
                  <strong>${friend.sender_id.full_name}</strong> 
                  (@${friend.sender_id.user_name}) has sent you a friend request on HobbyHub.
                </p>

                <p>
                  Connect to explore shared hobbies, collaborate on creative ideas, 
                  and grow your circle of inspiration.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="${process.env.FRONTEND_URL}"
                     style="background:linear-gradient(to right,#ECC154,#e0b23c);
                            color:#111827;
                            padding:12px 25px;
                            text-decoration:none;
                            border-radius:8px;
                            font-weight:600;
                            display:inline-block;">
                    View Request
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you weren’t expecting this request, you can safely ignore this email.
                </p>

                <p style="margin-top:30px;">
                  Warm regards,<br/>
                  <strong>The HobbyHub Team</strong>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

      await sendMail({
        to: friend.receiver_id.email,
        subject,
        body,
      });
    });

    const pendingWithin24Hrs = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", pendingWithin24Hrs);
    await step.run("send-friend-request-remainder", async () => {
      const friend = await Friend.findById(friendId).populate(
        "sender_id receiver_id",
      );

      if (friend.status === "accepted") {
        return { message: "Already accepted" };
      }

      const subject = "You’ve received a new friend request on HobbyHub 🤝";

      const body = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Friend Request</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#1f2937;">HobbyHub 🤝</h2>
              </td>
            </tr>

            <tr>
              <td style="color:#374151; font-size:15px; line-height:1.6;">
                <p>Hi <strong>${friend.receiver_id.full_name}</strong>,</p>

                <p>
                  <strong>${friend.sender_id.full_name}</strong> 
                  (@${friend.sender_id.user_name}) has sent you a friend request on HobbyHub.
                </p>

                <p>
                  Connect to explore shared hobbies, collaborate on creative ideas, 
                  and grow your circle of inspiration.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="${process.env.FRONTEND_URL}"
                     style="background:linear-gradient(to right,#ECC154,#e0b23c);
                            color:#111827;
                            padding:12px 25px;
                            text-decoration:none;
                            border-radius:8px;
                            font-weight:600;
                            display:inline-block;">
                    View Request
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you weren’t expecting this request, you can safely ignore this email.
                </p>

                <p style="margin-top:30px;">
                  Warm regards,<br/>
                  <strong>The HobbyHub Team</strong>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

      await sendMail({
        to: friend.receiver_id.email,
        subject,
        body,
      });

      return { message: "Remainder sent" };
    });
  },
);

//Ingest Function to delete the story after 24 hours
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24hrs = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await step.sleepUntil("wait-for-24-hours", in24hrs);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "Story deleted!" };
    });
  },
);

// send unseen msgs notifications
const sendUnseenMsgsNotification = inngest.createFunction(
  { id: "send-unseen-msgs-notification" },
  { cron: "TZ=Asia/Karachi 0 9 * * *" }, //Everyday at 9AM Pakistan time
  async ({ step }) => {
    const msgs = await Chat.find({
      seen: false,
    }).populate("reciever_id");

    const unseen_count = {};

    msgs.map((msg) => {
      unseen_count[msg.reciever_id._id] =
        (unseen_count[msg.reciever_id._id] || 0) + 1;
    });

    for (const userId in unseen_count) {
      const user = await User.findById(userId);

      const count = unseen_count[userId];

      const subject = `📩 ${count} unread message${count > 1 ? "s" : ""} waiting for you on HobbyHub`;

      const now = new Date().toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        dateStyle: "full",
        timeStyle: "short",
      });

      const body = `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:24px; color:#333;">
  <p>Hi ${user.full_name},</p>

  <p>
    You have <strong>${count}</strong> unread message${count > 1 ? "s" : ""} waiting for you on HobbyHub.
  </p>

  <p>
    Log in to your account to check your messages and continue the conversation.
  </p>

  <p>
    Sent on ${now} (Pakistan Standard Time)
  </p>
</div>
`;

      await sendMail({
        to: user.email,
        subject,
        body,
      });

      return { message: "Notification sent!" };
    }
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendNewFriendRequestRemainder,
  deleteStory,
  sendUnseenMsgsNotification
];
