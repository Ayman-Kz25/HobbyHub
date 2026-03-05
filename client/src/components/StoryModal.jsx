import { useAuth } from "@clerk/clerk-react";
import { LucideSparkles, Sparkle, TextIcon, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const { getToken } = useAuth();

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

  const MAX_VIDEO_DURATION = 60; //seconds
  const MAX_VIDEO_SIZE_MB = 50; //MB

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video")) {
        if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
          toast.error(`Video file size cannot exceed ${MAX_VIDEO_SIZE_MB} MB.`);
          setMedia(null);
          setPreviewUrl(null);
          return;
        }
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > MAX_VIDEO_DURATION) {
            toast.error("Video duration cannot exceed 60 seconds!");
            setMedia(null);
            setPreviewUrl(null);
          } else {
            setMedia(file);
            setPreviewUrl(URL.createObjectURL(file));
            setText("");
            setMode("media");
          }
        };
        video.src = URL.createObjectURL(file);
      } else if (file.type.startsWith("image")) {
        setMedia(file);
        setPreviewUrl(URL.createObjectURL(file));
        setText("");
        setMode("media");
      }
    }
  };

  const handleCreateStory = async () => {
    const media_type =
      mode === "media"
        ? media?.type.startsWith("image")
          ? "image"
          : "video"
        : "text";

    if (media_type === "text" && !text) {
      throw new Error("Please enter some text!");
    }

    let formData = new FormData();
    formData.append("content", text);
    formData.append("media_type", media_type);
    formData.append("bg_clr", bg);
    if (media) {
      formData.append("media", media);
    }

    const token = await getToken();

    try {
      const { data } = await api.post('/api/story/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setShowModal(false);
        toast.success("Story created successfully");
        fetchStories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
              onChange={handleMediaUpload}
            />
            <Upload size={18} /> Photo/Video
          </label>
        </div>
        <button
          className="upload-btn"
          onClick={() =>
            toast.promise(handleCreateStory(), {
              loading: "Saving...",
            })
          }
        >
          <LucideSparkles size={18} /> Upload Story
        </button>
      </div>
    </div>
  );
};
export default StoryModal;
