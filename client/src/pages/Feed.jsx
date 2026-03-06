import { useEffect, useState } from "react";
import { postsData } from "../data/data";
import Loading from "../components/Loading";
import Storybar from "../components/Storybar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages.jsx";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const Feed = () => {
  const { getToken } = useAuth();
  const {user} = useUser()
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/post/feed", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="feed-container">
      <div className="w-full max-w-2xl">
        {/* Stories */}
        <Storybar />

        {/* Post List */}
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="hidden xl:flex flex-col gap-4 w-[320px] sticky top-6 h-fit">
        {/* Profile Greeting Card */}
        <div className="bg-gray-50 p-5 rounded-xl shadow text-center border border-gray-300">
          <img src={user.imageUrl} className="w-20 h-20 rounded-full mx-auto object-cover" />

          <h3 className="font-semibold mt-3 text-gray-800">{user.fullName}</h3>

          <p className="text-xs text-gray-500">Welcome back👋🏻</p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
