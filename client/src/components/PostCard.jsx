import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { userData } from "../data/data";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const { getToken } = useAuth();
  const [likes, setLikes] = useState(post.likes_count);
  const currentUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const postWithHashtag = post.content?.replace(
    /(#\w+)/g,
    '<span class="text-[#ecb52b]">$1</span>',
  );
  const handleLike = async () => {
    try {
      const { data } = await api.post(
        `/api/post/like`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        },
      );
      if(data.success){
        toast.success(data.message);
        setLikes(prev=>{if(prev.includes(currentUser._id)){
          return prev.filter(id=>id !== currentUser._id)
        } else {
          return [...prev, currentUser._id]
        }});
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(data.error)
    }
  };
  return (
    <div className="post-card">
      {/* User Info */}
      <div
        className="user-info"
        onClick={() => navigate("/profile/" + post.user._id)}
      >
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
      {post?.media_urls && post.media_urls.length > 0 && (
        <div
          className={`mt-3 grid gap-2 ${
            post.media_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.media_urls.map((item, index) => {
            const isSingle = post.media_urls.length === 1;
            const isVideo =
              item.includes(".mp4") ||
              item.includes(".mov") ||
              item.includes(".webm") ||
              item.includes(".mkv");

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl ${
                  isSingle ? "w-full" : "aspect-square"
                }`}
              >
                {isVideo ? (
                  <video
                    src={item}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item}
                    alt=""
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
        <div className="flex items-center gap-1">
          <Heart
            size={18}
            className={`icon ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`}
            onClick={handleLike}
          />
          <span>{likes.length}</span>
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={18} />
          <span></span>
        </div>

        <div className="flex items-center gap-1">
          <Share2 size={18} />
          <span></span>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
