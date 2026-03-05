import { MapPin, MessageCircle, PlusCircle, UserPlus } from "lucide-react";
import { userData } from "../data/data";
import { useSelector } from "react-redux";

const UserCard = ({ user }) => {
  const currentUser = useSelector((state) => state.user.value);

  const handleFollow = async () => {};

  const handleFriendRequest = async () => {};
  return (
    <div key={user._id} className="user-card">
      <div className="text-center">
        <img
          src={user.profile_pic}
          alt=""
          className="rounded-full w-16 h-16 shadow-md mx-auto object-cover"
        />
        <p className="pt-4 font-semibold text-base sm:text-lg">
          {user.full_name}
        </p>
        {user.user_name && (
          <p className="text-gray-500 text-sm">@{user.user_name}</p>
        )}
        {user.bio && (
          <p className="text-gray-600 mt-2 text-sm px-2 sm:px-4 line-clamp-3">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 max-w-full truncate">
          <MapPin size={16} /> {user.location}
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers?.length || 0}</span> Followers
        </div>
      </div>

      {/* Btns */}
      <div className="flex flex-row mt-5 gap-2">
        {/* Follow Btn */}
        <button
          className="follow-btn"
          disabled={currentUser?.following.includes(user._id)}
          onClick={handleFollow}
        >
          <UserPlus size={18} />
          {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
        </button>

        {/* Friend Request Btn / Chat Btn */}
        <button
          className="request-btn group"
          disabled={currentUser?.following.includes(user._id)}
          onClick={handleFriendRequest}
        >
          {currentUser?.connections.includes(user._id) ? (
            <MessageCircle
              size={20}
              className="group-hover:scale-105 transition"
            />
          ) : (
            <PlusCircle
              size={20}
              className="group-hover:scale-105 transition"
            />
          )}
        </button>
      </div>
    </div>
  );
};
export default UserCard;
