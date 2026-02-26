import { Sparkle, TextIcon, Upload, X } from "lucide-react";
import { useState } from "react";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgClrs = [
    "#FDE68A",
    "#FBCFE8",
    "#BBF7D0",
    "#BFDBFE",
    "#D8B4FE",
    "#BAE6FD",
  ];

  const [mode, setMode] = useState("text");
  const [bg, setBg] = useState(bgClrs[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateStory = async () => {};

  return (
    <div className="story-modal">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <span className="w-10"></span>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <button
            className="text-white p-2 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <X />
          </button>
        </div>

        <div
          className="rounded-lg h-96 flex items-center justify-center relative"
          style={{ backgroundColor: bg }}
        >
          {mode === "text" && (
            <textarea
              className="add-story-content"
              placeholder="Tell your story..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {mode === "media" &&
            previewUrl &&
            (media?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt=""
                className="max-h-full object-contain"
              />
            ) : (
              <video src={previewUrl} className="max-h-full object-contain" />
            ))}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          {bgClrs.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full ring cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => setBg(color)}
            />
          ))}
        </div>
        <div className="flex mt-4 gap-2">
          <button
            className={`text-btn ${mode === "text" ? "bg-gray-50 text-gray-950" : "bg-zinc-800"}`}
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
          >
            <TextIcon size={18} /> Text
          </button>
          <label
            className={`media-btn ${mode === "media" ? "bg-gray-50 text-gray-950" : "bg-zinc-800"}`}
          >
            <input
              type="file"
              accept="image/*, video/*"
              hidden
              onChange={(e) => {
                handleMediaUpload(e);
                setMode("media");
              }}
            />
            <Upload size={18} /> Photo/Video
          </label>
        </div>
        <button className="upload-btn">
          <Sparkle size={18}/> Upload Story
        </button>
      </div>
    </div>
  );
};
export default StoryModal;
