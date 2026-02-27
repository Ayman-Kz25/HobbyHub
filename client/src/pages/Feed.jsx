import { useEffect, useState } from "react";
import { postsData } from "../data/data";
import Loading from "../components/Loading";
import Storybar from "../components/Storybar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(postsData);
  };

  useEffect(() => {
    fetchFeeds();
    setLoading(false);
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
            src="https://i.pinimg.com/736x/a2/eb/94/a2eb946b7f4776b1642fa933e14cfc7d.jpg"
            alt=""
            className="w-75 h-auto rounded-xl"
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
        <div>
          <RecentMessages />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
