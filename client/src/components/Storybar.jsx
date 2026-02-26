import { useEffect, useState } from "react";
import { storyData } from "../data/data";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const Storybar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
    setStories(storyData);
  };

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="storybar-container">
      <div className="flex gap-4 pb-5">
        {/* Add New Story Card */}
        <div onClick={() => setShowModal(true)} className="new-story-card">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="add-icon">
              <Plus className="w-5 h-5 text-gray-50" strokeWidth={3} />
            </div>
            <p className="text-sm font-medium text-gray-700 text-center">
              Create Story
            </p>
          </div>
        </div>
        {/* Story Cards */}
        {stories.map((story, index) => (
          <div
            key={index}
            className="story-card"
            style={{backgroundColor: story.bg_clr}}
            onClick={() => setViewStory(story)}
          >
            <img src={story.user.profile_pic} alt="" className="profile-pic" />
            <p className="content">{story.content}</p>
            <p className="creation-datetime">
              {moment(story.createdAt).fromNow()}
            </p>
            {story.media_type !== "text" && (
              <div className="absolute inset-0 z-1 rounded-lg overflow-hidden bg-black">
                {story.media_type === "image" ? (
                  <img src={story.media_url} alt="" className="story-img" />
                ) : (
                  <video src={story.media_url} className="story-video" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Story Modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
      )}

      {/* View Story Modal */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
};
export default Storybar;
