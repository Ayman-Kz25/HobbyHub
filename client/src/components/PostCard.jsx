import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { userData } from "../data/data";

const PostCard = ({ post }) => {

    const [likes, setLikes] = useState(post.likes);
    const currentUser = userData
  const postWithHashtag = post.content.replace(
    /(#\w+)/g,
    '<span class="text-[#ecb52b]">$1</span>'
  );
  const handleLike = async () => {
  }
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
          dangerouslySetInnerHTML={{ __html: postWithHashtag }}
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

      {/* Actions */}
      <div className="action-btns">
        {/* Likes */}
        <div className="flex items-center gap-1">
            <Heart size={18} className={`icon ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike}/>
            <span>{likes.length}</span>
        </div>
        {/* Comments */}
        <div className="flex items-center gap-1">
            <MessageCircle size={18}/>
            <span>{2}</span>
        </div>
        {/* Share */}
        <div className="flex items-center gap-1">
            <Share2 size={18}/>
            <span>{4}</span>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
