import { BadgeCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;

  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain"
          />
        );

      case "video":
        return (
          <video
            src={viewStory.media_url}
            className="max-h-screen"
            onEnded={() => setViewStory(null)}
            controls
            autoPlay
          />
        );

      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center p-8 text-gray-950 text-2xl text-center">
            {viewStory.content}
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    let timer, progressInterval;

    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);

      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;

      // Set Progress line in Progressbar
      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);

      // Close Progressbar after 10s
      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      }
    }
  }, [viewStory, setViewStory]);
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
        <div className="progress-line" style={{ width: `${progress}%` }}></div>
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
          <BadgeCheck size={18} />
        </div>
      </div>
      {/* Close Button */}
      <button className="close-btn" onClick={handleClose}>
        <X size={24} className="close-icon" />
      </button>
      {/* Content Wrapper */}
      <div className="content-wrapper">{renderContent()}</div>
    </div>
  );
};
export default StoryViewer;
