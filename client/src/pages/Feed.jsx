import { useEffect, useState } from "react";
import { postsData } from "../data/data";
import Loading from "../components/Loading";
import Storybar from "../components/Storybar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const Feed = () => {
  const { getToken } = useAuth();
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/post/feed', {
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
        {/* Hobbies/Interests */}
        <div className="max-w-xs bg-gray-50 text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-gray-800 font-semibold">Hobbies & Interests</h3>
          <img
            src="https://i.pinimg.com/736x/c2/b5/08/c2b5086ddce9a206ac1f25281aacbe66.jpg"
            alt=""
            className="w-75 h-50 rounded-xl"
          />
          <p className="text-gray-700 leading-relaxed">
            Building digital experiences through code & design.
          </p>
          <p className="text-gray-400">
            Passionate about front-end development, UI/UX exploration, and
            creating clean, interactive web applications that blend logic with
            creativity.
          </p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
