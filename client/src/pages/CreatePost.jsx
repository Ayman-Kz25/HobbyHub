import React, { useState } from "react";
import { userData } from "../data/data";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = userData;

  const handleSubmit = async () => {};

  return (
    <div className="max-h-screen bg-gradient-to-b from-gray-100 to-gray-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title & Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Create Post
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Share your passion, inspire your circle.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-xl bg-gray-50 p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_pic}
              alt=""
              className="w-12 h-12 rounded-full shadow flex-shrink-0"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.user_name}</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder:text-gray-400"
            placeholder="Let's Create and Share"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Media */}
          {media.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {media.map((item, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(item)}
                    alt=""
                    className="h-20 rounded-lg"
                  />
                  <div
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
                    onClick={() =>
                      setMedia(media.filter((_, index) => index !== i))
                    }
                  >
                    <X size={18} color="text-gray-50" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <Image size={24} />
            </label>
            <input
              type="file"
              id="images"
              accept="images/*"
              hidden
              multiple
              onChange={(e) => setMedia([...media, ...e.target.files])}
            />

            <button
              className="text-sm rounded-lg bg-gradient-to-r from-[#ECC154] to-amber-200 hover:to-[#e0b23c] active:scale-95 transition text-gray-950 font-medium px-8 py-2 cursor-pointer focus:outline-none"
              onClick={() => {
                (toast.promise(handleSubmit),
                  {
                    loading : "Uploading...",
                    success: <p>Post Uploaded</p>,
                    error: <p>Post Not Uploaded</p>,
                  });
              }}
              disabled={loading}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
