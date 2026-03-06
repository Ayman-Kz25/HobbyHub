import mongoose from "mongoose";
import User from "../models/User.js";

const users = [
  {
    _id: "u3",
    email: "alikhan@example.com",
    user_name: "alikhan",
    full_name: "Ali Khan",
    bio: "Photographer chasing golden hours 📸",
    profile_pic:
      "https://i.pinimg.com/736x/13/c7/56/13c75665a3b6bc1ff7836f92b2064049.jpg",
    location: "Istanbul, Turkey",
  },
  {
    _id: "u4",
    email: "dylan@example.com",
    user_name: "dylanthorn",
    full_name: "Dylan Thorn",
    bio: "Singer-songwriter 🎸",
    profile_pic:
      "https://i.pinimg.com/736x/98/9c/86/989c8675ea88cc9892c660089b63dc6c.jpg",
    location: "Nashville, USA",
  },
  {
    _id: "u5",
    email: "sarah@example.com",
    user_name: "sarahshah",
    full_name: "Sarah Shah",
    bio: "Home baker & dessert lover 🥐",
    profile_pic:
      "https://i.pinimg.com/736x/5f/11/e2/5f11e2b0c0af5c71795314ab0232e41f.jpg",
    location: "Lahore, Pakistan",
  },
  {
    _id: "u6",
    email: "leo@example.com",
    user_name: "leomartin",
    full_name: "Leo Martin",
    bio: "Athlete | Marathon Runner 🏃‍♂️",
    profile_pic:
      "https://i.pinimg.com/736x/95/69/c7/9569c7ed1cd5ba05d86b6d51d489067c.jpg",
    location: "Berlin, Germany",
  },
  {
    _id: "u7",
    email: "jasmine@example.com",
    user_name: "jasminewrites",
    full_name: "Jasmine Noor",
    bio: "Lifestyle Blogger ☕✨",
    profile_pic:
      "https://i.pinimg.com/736x/42/b7/4c/42b74c2d949bfa432c0b947be07cb482.jpg",
    location: "Toronto, Canada",
  },
];

const seedUsers = async () => {
  try {
    const Mongo = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/hobbyhub"
    await mongoose.connect(Mongo);
    console.log("MongoDB connected");

    // remove existing seeded users
    await User.deleteMany({
      _id: { $in: ["u3", "u4", "u5", "u6", "u7"] },
    });

    console.log("Old seeded users removed");

    // insert again
    await User.insertMany(users);

    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

export default seedUsers();

const user = await User.find();
console.log(user);