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
  full_name: "Anya Khan",
  user_name: "anyakhan",
  bio: "Front-end developer by profession,💻 Designer by passion ✨ Turning ideas into interactive experiences. Side projects, clean code, and late-night debugging sessions fuel my creativity.",
  profile_pic:
    "https://i.pinimg.com/1200x/4b/ac/d3/4bacd354cc8936605be7e20984fc745f.jpg",
  cover_photo: "",
  location: "San Francisco, CA, USA",
  followers: ["u2", "u3", "u4"],
  following: ["u2", "u5", "u6"],
  connections: ["u2", "u3", "u5"],
  posts: [
    { _id: "p1", content: "Hello world!", createdAt: "2026-02-22T08:00:00Z" },
    {
      _id: "p2",
      content: "Loving this new platform!",
      createdAt: "2026-02-21T14:30:00Z",
    },
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
  bio: "Painter & visual storyteller 🎨 Inspired by light, emotion, and everyday beauty. Creating art that speaks without words.",
  profile_pic:
    "https://i.pinimg.com/736x/4f/ef/40/4fef40597b2009403b548700350109c7.jpg",
};

export const user3Data = {
  ...userData,
  _id: "u3",
  user_name: "alikhan",
  full_name: "Ali Khan",
  bio: "Photographer chasing golden hours 📸 Capturing stories through light, shadows, and spontaneous moments.",
  profile_pic:
    "https://i.pinimg.com/736x/13/c7/56/13c75665a3b6bc1ff7836f92b2064049.jpg",
};

export const user4Data = {
  ...userData,
  _id: "u4",
  user_name: "dylanthorn",
  full_name: "Dylan Thorn",
  bio: "Singer-songwriter 🎸 Turning feelings into melodies. Acoustic nights, studio sessions, and music that connects souls.",
  profile_pic:
    "https://i.pinimg.com/736x/98/9c/86/989c8675ea88cc9892c660089b63dc6c.jpg",
};

export const user5Data = {
  ...userData,
  _id: "u5",
  user_name: "sarahshah",
  full_name: "Sarah Shah",
  bio: "Home baker & dessert lover 🥐 Baking happiness one recipe at a time. Flour, patience, and a little sweetness.",
  profile_pic:
    "https://i.pinimg.com/736x/5f/11/e2/5f11e2b0c0af5c71795314ab0232e41f.jpg",
};

export const user6Data = {
  ...userData,
  _id: "u6",
  user_name: "leomartin",
  full_name: "Leo Martin",
  bio: "Athlete | Marathon Runner | Discipline builds freedom 🏃‍♂️",
  profile_pic:
    "https://i.pinimg.com/736x/95/69/c7/9569c7ed1cd5ba05d86b6d51d489067c.jpg",
};

export const user7Data = {
  ...userData,
  _id: "u7",
  user_name: "jasminewrites",
  full_name: "Jasmine Noor",
  bio: "Lifestyle Blogger | Storyteller | Coffee & late night thoughts ☕✨",
  profile_pic:
    "https://i.pinimg.com/736x/42/b7/4c/42b74c2d949bfa432c0b947be07cb482.jpg",
};

export const storyData = [
  {
    _id: "s1",
    user: user5Data,
    content: "",
    media_url:
      "https://i.pinimg.com/736x/bd/e5/12/bde5123b32122d235c5fc8c3fb367417.jpg",
    media_type: "image",
    bg_clr: "#FEF3C7",
    createdAt: "2026-02-22T18:00:00Z",
    updatedAt: "2026-02-22T18:05:00Z",
  },
  {
    _id: "s2",
    user: user2Data,
    content: "",
    media_url:
      "https://i.pinimg.com/736x/69/4a/cd/694acd965cfeb11eb5fe1080a6e75031.jpg",
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
    user: userData,
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
  {
    _id: "s7",
    user: user6Data,
    content:
      "Morning training session complete 🏃‍♂️ Consistency beats motivation every single time. Showing up daily is the real victory.⚡",
    media_url: "",
    media_type: "text",
    bg_clr: "#FDE68A",
    createdAt: "2026-02-26T06:30:00Z",
    updatedAt: "2026-02-26T06:35:00Z",
  },
  {
    _id: "s8",
    user: user7Data,
    content:
      "Spent the evening journaling at my favorite café ☕ There’s something powerful about putting your thoughts into words and watching clarity unfold.",
    media_url:
      "https://i.pinimg.com/736x/ab/4e/19/ab4e19c9c8a5a3f4dff12e4e5f8a7a90.jpg",
    media_type: "image",
    bg_clr: "#FBCFE8",
    createdAt: "2026-02-26T20:00:00Z",
    updatedAt: "2026-02-26T20:05:00Z",
  },
];

/*

user1 = Ayman = Developer
user2 = Anna = Painter
user3 = Ali = Photographer
user4 = Dylan = Singer
user5 = Sarah = Baker
user6 = Leo = Athlete
user7 = Jasmine = Blogger

*/

export const postsData = [
  {
    _id: "post1",
    user: user3Data,
    content:
      "Photography has taught me patience. Waiting for the perfect lighting, the perfect angle, the perfect moment — it makes you appreciate the little details in life. 📷✨ \n\n#Photography #GoldenHour #CreativeLife #VisualStorytelling",
    media: [
      { type: "video", url: "/src/assets/video1.mp4" },
    ],
    likes: ["u2", "u3", "u5"],
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
    user: user7Data,
    content:
      "Tried a new Italian pasta recipe from scratch today 🍝 Cooking is becoming more than a hobby — it’s #CreativeExpression. Exploring #ItalianCuisine at home makes me appreciate the art behind every plate.",
    media: [
      { type: "image", url: "https://i.pinimg.com/736x/49/85/3a/49853a1a95f3203f69097aba59fb6dae.jpg" },
      { type: "image", url: "https://i.pinimg.com/1200x/6b/42/f1/6b42f1f940560d7468fccea1d2ef832c.jpg" },
      { type: "image", url: "https://i.pinimg.com/1200x/61/f7/eb/61f7ebfb8ef80e65e173ca3df4c1cccd.jpg" },
    ],
    likes: ["u1"],
    comments: [],
    createdAt: "2026-02-21T20:00:00Z",
    updatedAt: "2026-02-21T20:05:00Z",
  },
  {
    _id: "post3",
    user: user6Data,
    content:
      "Completed a 12km endurance run this weekend. #Fitness isn’t just about physical strength — it builds mental resilience and #discipline.",
    media: [
      { type: "image", url: "https://i.pinimg.com/1200x/f7/9e/2c/f79e2cd4827d37f1ce144cd82ec77904.jpg" },
    ],
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
      "Built a small habit-tracker app this weekend just for fun 💻 Side projects remind me why I fell in love with coding in the first place.\n\n#DeveloperLife #SideProject #WebDevelopment #CodingJourney #BuildInPublic",
    media: [
      { type: "image", url: null },
    ],
    likes: ["u2"],
    comments: [],
    createdAt: "2026-02-19T23:00:00Z",
    updatedAt: "2026-02-19T23:05:00Z",
  },
  {
    _id: "post5",
    user: user2Data,
    content:
      "Finished my latest acrylic painting today 🎨 It started as random brush strokes and somehow turned into something meaningful. That’s the beauty of #ArtLife — trusting the process and letting creativity flow.",
    media: [
      { type: "image", url: "https://i.pinimg.com/736x/00/c7/4a/00c74aceed355716046c9beae66b572b.jpg" },
    ],
    likes: ["u1", "u3"],
    comments: [],
    createdAt: "2026-02-18T18:00:00Z",
    updatedAt: "2026-02-18T18:05:00Z",
  },
  {
    _id: "post6",
    user: user5Data,
    content:
      "Early morning cookie baking session today 🍪 There’s something comforting about warm cookies fresh out of the oven. #BakingLove has taught me patience, precision, and how the smallest ingredients can create the biggest smiles. Nothing beats homemade sweetness. ✨",
    media: [
      { type: "image", url: "https://i.pinimg.com/1200x/dc/b8/8e/dcb88e81f3d99ba4a793ce0dcfd96fc3.jpg" },
      { type: "image", url: "https://i.pinimg.com/1200x/40/04/21/400421fa6df0a21bbaa3d4fcca19543e.jpg" },
      { type: "image", url: "https://i.pinimg.com/1200x/8c/80/82/8c8082b95934631b79a0e64680a1414f.jpg" },
      { type: "image", url: "https://i.pinimg.com/736x/3a/35/e4/3a35e448858669dfd0be052f02f2f471.jpg" },
    ],
    likes: ["u1", "u2", "u3"],
    comments: [
      {
        _id: "c3",
        user: userData,
        content: "This looks delicious! 🔥",
        createdAt: "2026-02-17T17:00:00Z",
      },
    ],
    createdAt: "2026-02-17T16:00:00Z",
    updatedAt: "2026-02-17T16:05:00Z",
  },
];
