import React, { useState } from "react";
import { userData } from "../data/data";
import { Image, Video, X } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = userData;

  const handleSubmit = async () => {};

  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia((prev) => [...prev, ...files]);
  };

  return (
    <div className="max-h-screen bg-gradient-to-b from-gray-100 to-gray-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Title & Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Create Post
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Share your passion, inspire your circle.
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_pic}
              alt=""
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-sm sm:text-base">
                {user.full_name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                @{user.user_name}
              </p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full resize-none min-h-[80px] sm:min-h-[100px] mt-4 text-sm sm:text-base outline-none placeholder:text-gray-400"
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Media Preview */}
          {media.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {media.map((file, index) => {
                const fileUrl = URL.createObjectURL(file);
                const isVideo = file.type.startsWith("video");

                return (
                  <div key={index} className="relative group">
                    {isVideo ? (
                      <video
                        src={fileUrl}
                        controls
                        className="w-full h-32 sm:h-40 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={fileUrl}
                        alt=""
                        className="w-full h-32 sm:h-40 object-cover rounded-lg"
                      />
                    )}
                    <button
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-1 rounded-full text-gray-50 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      onClick={()=>removeMedia(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-300">
            <div className="flex items-center gap-4">
              <label
                htmlFor="mediaUpload"
                className="text-gray-500 hover:text-gray-800 transition cursor-pointer"
              >
                <Image size={24} />
              </label>
      
              <input
                type="file"
                id="mediaUpload"
                accept="image/*, video/*"
                hidden
                multiple
                onChange={handleMediaChange}
              />
            </div>

            <button
              className="px-6 py-2 text-sm sm:text-base font-medium rounded-lg bg-gradient-to-r from-[#ECC154] to-amber-200 hover:to-[#e0b23c] active:scale-95 transition text-gray-950 cursor-pointer focus:outline-none disabled:opacity-60"
              onClick={() => 
                toast.promise(handleSubmit(),{
                    loading: "Uploading...",
                    success: "Post Uploade successfully!",
                    error: "Failed to upload post",
                  })
              }
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
