import { BadgeCheck } from "lucide-react";
import moment from "moment";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {/* User Info */}
      <div className="user-info">
        <img src={post.user.profile_pic} alt="" className="profile-pic" />
        <div>
          <div className="flex items-center space-x-1">
            <span>{post.user.full_name}</span>
            <BadgeCheck size={24} color="#ECC154" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.user_name} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}}/>
      )}
    </div>
  );
};
export default PostCard;
