import { Calendar, MapPin, PenBox, Verified } from "lucide-react";
import moment from "moment";

const ProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <div className="profile-info-container">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-32 h-32 border-4 border-gray-50 shadow-lg absolute -top-16 rounded-full">
          <img
            src={user.profile_pic}
            alt=""
            className="absolute rounded-full z-2"
          />
        </div>

        <div className="w-full pt-16 md:pt-0 md:pl-36">
          <div className="profile-info">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.full_name}
                </h1>
                <Verified size={24} color="#ECC154" />
              </div>
              <p className="text-gray-600">
                {user.user_name ? `@${user.user_name}` : "Add a username"}
              </p>
            </div>

            {!profileId && (
              <button className="edit-btn" onClick={() => setShowEdit(true)}>
                <PenBox size={18} />
                Edit
              </button>
            )}
          </div>

          <p className="text-gray-700 text-sm max-w-md mt-4">{user.bio}</p>

          {/* Location and Joined Date */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={18} />
              {user.location ? user.location : "Add location"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={18} />
              Joined{" "}
              <span className="font-medium">
                {moment(user.createdAt).fromNow()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6 mt-6 border-t border-gray-200 pt-4">
            <div>
                <span className="sm:text-xl font-bold text-gray-900">
                    {posts.length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                    Posts
                </span>
            </div>
            <div>
                <span className="sm:text-xl font-bold text-gray-900">
                    {user.followers.length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                    Followers
                </span>
            </div>
            <div>
                <span className="sm:text-xl font-bold text-gray-900">
                    {user.following.length}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                    Following
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
