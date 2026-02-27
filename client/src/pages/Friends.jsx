import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  connectionsData as connections,
  followersData as followers,
  followingData as following,
  pendingConnectionsData as pendingConnections,
} from "../data/data";

const Friends = () => {
  const navigate = useNavigate();
  const dataArray = [
    { label: "Followers", value: followers, icon: Users },
    { label: "Following", value: following, icon: UserCheck },
    { label: "Pending", value: pendingConnections, icon: UserRoundPen },
    { label: "Connections", value: connections, icon: UserPlus },
  ];
  return (
    <div className="friends-container">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title and Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Friends
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Explore friendships with similar passion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Friends;
