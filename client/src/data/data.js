import { Home, MessageCircle, Search, UserIcon, Users } from "lucide-react";

export const menuItems = [
  { to: "/", label: "Feed", Icon: Home },
  { to: "/messages", label: "Messages", Icon: MessageCircle },
  { to: "/connections", label: "Connections", Icon: Users },
  { to: "/discover", label: "Discover", Icon: Search },
  { to: "/profile", label: "Profile", Icon: UserIcon },
];

export const userData = {
  _id: "u1",
  email: "ayman.kz@example.com",
  full_name: "Ayman Kz",
  user_name: "aymankz",
  bio: "Just a tech enthusiast sharing thoughts!",
  profile_pic: "/src/assets/profile.png",
  cover_photo: "https://picsum.photos/800/200",
  location: "San Francisco, CA, USA",
  followers: ["u2", "u3", "u4"],
  following: ["u2", "u5", "u6"],
  connections: ["u2", "u3", "u5"],
  posts: [
    { _id: "p1", content: "Hello world!", createdAt: "2026-02-22T08:00:00Z" },
    { _id: "p2", content: "Loving this new platform!", createdAt: "2026-02-21T14:30:00Z" },
  ],
  is_verified: true,
  createdAt: "2026-01-10T10:00:00Z",
  updatedAt: "2026-02-20T12:00:00Z",
};

export const user2Data = {
  ...userData,
  _id: "u2",
  user_name: "annawilson",
  full_name: "Anna Wilson",
  profile_pic: "https://i.pinimg.com/736x/42/f9/83/42f9832cf59f58eafadb035d80adf306.jpg",
};

export const user3Data = {
  ...userData,
  _id: "u3",
  user_name: "alikhan",
  full_name: "Ali Khan",
  profile_pic: "https://i.pinimg.com/736x/13/c7/56/13c75665a3b6bc1ff7836f92b2064049.jpg",
};

export const user4Data = {
  ...userData,
  _id: "u4",
  user_name: "dylanthorn",
  full_name: "Dylan Thorn",
  profile_pic: "https://i.pinimg.com/736x/98/9c/86/989c8675ea88cc9892c660089b63dc6c.jpg",
};

export const user5Data = {
  ...userData,
  _id: "u5",
  user_name: "sarahshah",
  full_name: "Sarah Shah",
  profile_pic: "https://i.pinimg.com/736x/0e/3b/3d/0e3b3d79ed9ecc8262ffced61c1e0650.jpg",
};



export const storyData = [
  {
    _id: "s1",
    user: userData,
    content: "",
    media_url: "https://i.pinimg.com/736x/bd/e5/12/bde5123b32122d235c5fc8c3fb367417.jpg",
    media_type: "image",
    bg_clr: "#FEF3C7",
    createdAt: "2026-02-22T18:00:00Z",
    updatedAt: "2026-02-22T18:05:00Z",
  },
  {
    _id: "s2",
    user: user2Data,
    content: "",
    media_url: "https://i.pinimg.com/736x/69/4a/cd/694acd965cfeb11eb5fe1080a6e75031.jpg",
    media_type: "image",
    bg_clr: "#FCE7F3",
    createdAt: "2026-02-23T09:30:00Z",
    updatedAt: "2026-02-23T09:35:00Z",
  },
  {
    _id: "s3",
    user: user3Data,
    content: "",
    media_url: "/src/assets/video1.mp4",
    media_type: "video",
    bg_clr: "#DCFCE7",
    createdAt: "2026-02-25T05:45:00Z",
    updatedAt: "2026-02-25T05:50:00Z",
  },
  {
    _id: "s4",
    user: user5Data,
    content:
      "Spent 2 hours building a small React side project today. Coding as a hobby feels different - no deadlines, just creativity and curiosity.",
    media_url: "",
    media_type: "text",
    bg_clr: "#DBEAFE",
    createdAt: "2026-02-24T22:15:00Z",
    updatedAt: "2026-02-2T22:20:00Z",
  },
  {
    _id: "s5",
    user: user2Data,
    content: "",
    media_url: "/src/assets/video2.mp4",
    media_type: "video",
    bg_clr: "#E9D5FF",
    createdAt: "2026-02-24T17:10:00Z",
    updatedAt: "2026-02-24T17:15:00Z",
  },
  {
    _id: "s6",
    user: user4Data,
    content:
      "Practicing acoustic guitar tonight 🎸 Learning new chords every day. Progress feels slow but rewarding.",
    media_url: "",
    media_type: "text",
    bg_clr: "#F0F9FF",
    createdAt: "2026-02-17T20:00:00Z",
    updatedAt: "2026-02-17T20:05:00Z",
  },
];

export const postsData = [
  {
    _id: "post1",
    user: userData,
    content:
      "Photography has taught me patience. Waiting for the perfect lighting, the perfect angle, the perfect moment — it makes you appreciate the little details in life. 📷✨",
    media_url: "https://picsum.photos/600/400?random=31",
    media_type: "image",
    likes: ["u2", "u3"],
    comments: [
      {
        _id: "c1",
        user: user2Data,
        content: "This shot is stunning! 🔥",
        createdAt: "2026-02-22T19:00:00Z",
      },
    ],
    createdAt: "2026-02-22T18:30:00Z",
    updatedAt: "2026-02-22T18:35:00Z",
  },
  {
    _id: "post2",
    user: user2Data,
    content:
      "Tried a new Italian pasta recipe from scratch today 🍝 Cooking is becoming more than a hobby — it’s creative expression.",
    media_url: "https://picsum.photos/600/400?random=32",
    media_type: "image",
    likes: ["u1"],
    comments: [],
    createdAt: "2026-02-21T20:00:00Z",
    updatedAt: "2026-02-21T20:05:00Z",
  },
  {
    _id: "post3",
    user: user3Data,
    content:
      "Completed a 12km endurance run this weekend. Fitness isn’t just about physical strength — it builds mental resilience and discipline.",
    media_url: "",
    media_type: "text",
    likes: ["u1", "u2"],
    comments: [
      {
        _id: "c2",
        user: userData,
        content: "That consistency is inspiring 💪",
        createdAt: "2026-02-20T08:00:00Z",
      },
    ],
    createdAt: "2026-02-20T07:30:00Z",
    updatedAt: "2026-02-20T07:35:00Z",
  },
  {
    _id: "post4",
    user: userData,
    content:
      "Built a small habit-tracker app this weekend just for fun 💻 Side projects remind me why I fell in love with coding in the first place.",
    media_url: "",
    media_type: "text",
    likes: ["u2"],
    comments: [],
    createdAt: "2026-02-19T23:00:00Z",
    updatedAt: "2026-02-19T23:05:00Z",
  },
  {
    _id: "post5",
    user: user2Data,
    content:
      "Finished my latest acrylic painting today 🎨 It started as random brush strokes and somehow turned into something meaningful.",
    media_url: "https://picsum.photos/600/400?random=33",
    media_type: "image",
    likes: ["u1", "u3"],
    comments: [],
    createdAt: "2026-02-18T18:00:00Z",
    updatedAt: "2026-02-18T18:05:00Z",
  },
  {
    _id: "post6",
    user: user3Data,
    content:
      "Spent the afternoon working in my small backyard garden 🌱 Watching plants grow over time is one of the most satisfying hobbies I’ve picked up.",
    media_url: "https://picsum.photos/600/400?random=34",
    media_type: "image",
    likes: ["u1"],
    comments: [],
    createdAt: "2026-02-17T16:00:00Z",
    updatedAt: "2026-02-17T16:05:00Z",
  },
];