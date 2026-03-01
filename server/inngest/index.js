import { Inngest } from "inngest";
import User from "../models/user";

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

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
