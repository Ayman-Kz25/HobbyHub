import { useEffect, useState } from "react";
import { postsData } from "../data/data";
import Loading from "../components/Loading";
import Storybar from "../components/Storybar";
import PostCard from "../components/PostCard";

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
          {
            feeds.map((post)=>(
              <PostCard key={post._id} post={post} />
            ))
          }
        </div>
      </div>
      {/* Right Sidebar */}
      <div>
        <div>
          <h1>Hobbies</h1>
        </div>
        <h1>Recent Messages</h1>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
