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
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div
          className={`mt-3 grid gap-2 ${
            post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.media.map((item, index) => {
            const isSingle = post.media.length === 1;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl ${
                  isSingle ? "w-full" : "aspect-square"
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PostCard;
