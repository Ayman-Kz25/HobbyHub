import React from "react";
import { connectionsData } from "../data/data";
import { Eye, MessageSquare } from "lucide-react";

const Chats = () => {
  return (
    <div className="chats-container">
      <div className="chat-card">
        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chats</h1>
          <p className="text-gray-600">
            Share your thoughts with like minded people
          </p>
        </div>
        {/* Connected Users */}
        <div className="flex flex-col gap-3">
          {connectionsData.map((con) => (
            <div
              key={con._id}
              className="flex items-center gap-5 p-6 bg-gray-50 shadow rounded-md"
            >
              <img
                src={con.user.profile_pic}
                alt=""
                className="rounded-full w-12 h-12 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-700">
                  {con.user.full_name}
                </p>
                <p className="text-gray-500">@{con.user.user_name}</p>
                <p className="text-sm text-gray-600 truncate">{con.user.bio}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="chat-btn">
                  <MessageSquare size={18} />
                </button>
                <button className="view-btn">
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
