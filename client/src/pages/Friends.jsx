import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  connectionsData as friends,
  followersData as followers,
  followingData as following,
  pendingConnectionsData as pendingConnections,
} from "../data/data";
import { useState } from "react";

const Friends = () => {
  const navigate = useNavigate();

  const dataArray = [
    { key: "followers", label: "Followers", value: followers, icon: Users },
    { key: "following", label: "Following", value: following, icon: UserCheck },
    {
      key: "pending",
      label: "Pending",
      value: pendingConnections,
      icon: UserRoundPen,
    },
    { key: "friends", label: "Friends", value: friends, icon: UserPlus },
  ];

  const [activeTab, setActiveTab] = useState("followers");

  const activeData =
    dataArray.find((item) => item.key === activeTab)?.value || [];

  console.log(activeTab);
  console.log(activeData);

  return (
    <div className="friends-container">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title & Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Friends
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Your circle of inspiration and shared interests.
          </p>
        </div>

        {/* Counts */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item) => (
            <div key={item.label} className="friend-count">
              <span className="font-medium">{item.value.length}</span>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tab */}
        <div className="tabs-panel">
          {dataArray.map((item) => (
            <button
              key={item.key}
              className={`tab-btn ${activeTab === item.key ? "bg-gray-50 font-medium text-gray-950" : "text-gray-500 hover:text-gray-950"}`}
              onClick={() => setActiveTab(item.key)}
            >
              <item.icon size={18} />
              <span className="ml-1">{item.label}</span>
              <span className="tab-count">{item.value.length}</span>
            </button>
          ))}
        </div>

        {/* Friends */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {activeData.length === 0 ? (
            <p className="text-gray-500 mt-6">
              No {activeTab.toLowerCase()} yet.
            </p>
          ) : (
            activeData.map((item) => {
              // If your data is nested like { user: { _id: ... } }, keep 'item.user'.
              // If it's flat, use 'const user = item;'
              const user = item.user || item;

              return (
                <div
                  key={user._id}
                  className="user-profiles"
                >
                  <img
                    src={user.profile_pic}
                    alt={user.full_name}
                    className="rounded-full w-16 h-16 shadow-md mx-auto mb-3 object-cover"
                  />
                  <div className="text-center">
                    {" "}
                    {/* Added centering for better aesthetics */}
                    <p className="font-medium text-gray-800">
                      {user.full_name}
                    </p>
                    <p className="text-gray-500 text-sm">@{user.user_name}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {user.bio
                        ? `${user.bio.slice(0, 25)}...`
                        : "No bio available"}
                    </p>
                    <div className="flex flex-col gap-2 mt-4">
                      <button
                        className="user-btn"
                        onClick={() => navigate(`/profile/${user._id}`)}
                      >
                        View Profile
                      </button>

                      {/* Conditional Actions */}
                      {activeTab === "following" && (
                        <button className="p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 active:scale-95 transition text-gray-950 cursor-pointer focus:outline-none">Unfollow</button>
                      )}
                      {activeTab === "pending" && (
                        <button className="p-2 text-sm rounded bg-gray-200 hover:bg-gray-100 active:scale-95 transition text-gray-950 cursor-pointer focus:outline-none">Accept</button>
                      )}
                      {activeTab === "friends" && (
                        <button className="flex items-center justify-center gap-1 p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 active:scale-95 transition text-gray-950 cursor-pointer focus:outline-none" onClick={()=>navigate(`/chats/${user._id}`)}>
                          <MessageSquare size={14} /> Chat
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
