import React from "react";
import { connectionsData } from "../data/data";
import { Eye, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Chats = () => {
  const {friends} = useSelector((state)=>state.friends);
  const navigate = useNavigate();
  return (
    <div className="chats-container">
      <div className="chat-card">
        {/* Title & Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Chats
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Share your thoughts with like minded people
          </p>
        </div>

        {/* Connected Users */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {friends.map((con) => (
            <div
              key={con._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-gray-50 shadow-sm hover:shadow-md rounded-lg transition"
            >
              <img
                src={con.profile_pic}
                alt=""
                className="rounded-full w-12 sm:w-14 h-12 sm:h-14 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-700 text-sm sm:text-base">
                  {con.full_name}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  @{con.user_name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">
                  {con.bio}
                </p>
              </div>

              {/* Action Btns */}
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  className="chat-btn"
                  onClick={() => navigate(`/chats/${con._id}`)}
                >
                  <MessageSquare size={18} />
                </button>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/profile/${con._id}`)}
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
