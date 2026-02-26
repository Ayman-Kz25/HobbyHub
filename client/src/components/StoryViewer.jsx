import { BadgeCheck, X } from "lucide-react";

const StoryViewer = ({ viewStory, setViewStory }) => {
    const handleClose = () => {
        setViewStory(null)
    }
  return (
    <div
      className="view-story-container"
      style={{
        backgroundColor:
          viewStory.media_type === "text" ? viewStory.bg_clr : "#000000",
      }}
    >
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-line" style={{ width: "50" }}></div>
      </div>
      {/* User Info - Top Left */}
      <div className="user-info">
        <img
          src={viewStory.user?.profile_pic}
          alt=""
          className="size-7 sm:size-8 rounded-full object-cover border border-gray-50"
        />
        <div className="text-gray-50 font-medium flex items-center gap-1.5">
            <span>{viewStory.user?.full_name}</span>
            <BadgeCheck size={18}/>
        </div>
      </div>
      {/* Close Button */}
      <button className="close-btn" onClick={handleClose}>
        <X className="close-icon"/>
      </button>
    </div>
  );
};
export default StoryViewer;
