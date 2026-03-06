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
      <div>
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
      <div className="max-xl:hidden sticky top-0">
        {/* Profile Greeting Card */}
        <div className="max-w-xs bg-gray-50 p-4 rounded-lg shadow text-center">
          <img src={user.imageUrl} className="w-16 h-16 rounded-full mx-auto" />

          <h3 className="font-semibold mt-2">{user.fullName}</h3>

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
