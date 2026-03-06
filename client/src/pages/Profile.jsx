import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postsData, userData } from "../data/data";
import Loading from "../components/Loading";
import ProfileInfo from "../components/ProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";
import EditModal from "../components/EditModal";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.value);

  const { getToken } = useAuth();
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  const fetchUser = async (profileId) => {
    const token = await getToken();
    try {
      const { data } = await api.post(
        `/api/user/profiles`,
        { profileId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        setUser(data.profile);
        setPosts(data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchLikedPost = async () => {
    const token = await getToken();
    try {
      const { data } = await api.get(
        `/api/post/liked`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        setLikedPosts(data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchUser(profileId);
    } else {
      fetchUser(currentUser._id);
    }
  }, [profileId, currentUser]);

  useEffect(()=>{
    if(activeTab === "likes"){
      fetchLikedPost();
    }
  },[activeTab])

  return user ? (
    <div className="profile-container no-scrollbar">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="profile-card">
          {/* Cover Photo */}
          <div className="cover-photo">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* User Info */}
          <ProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-gray-50 rounded-lg shadow-sm p-1 flex max-w-md mx-auto">
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "bg-[#ECC154] text-gray-950" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts */}
          {activeTab === "posts" && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* Media */}
          {activeTab === "media" && (
            <div className="flex items-center max-sm:justify-center flex-wrap mt-6 max-w-6xl">
              {posts
                .filter((post) => post.media_urls && post.media_urls.length > 0)
                .flatMap((post) =>
                  post.media_urls.map((item, index) => {
                    const isVideo =
                      item.endsWith(".mp4") ||
                      item.endsWith(".webm") ||
                      item.endsWith(".mov");

                    return (
                      <Link
                        key={`${post._id}-${index}`}
                        target="_blank"
                        to={item}
                        className="relative group"
                      >
                        {isVideo ? (
                          <video
                            src={item}
                            className="w-64 rounded aspect-video object-cover max-sm:pb-1"
                          />
                        ) : (
                          <img
                            src={item}
                            alt=""
                            className="w-64 rounded aspect-video object-cover max-sm:pb-1"
                          />
                        )}

                        <p className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-gray-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-sm">
                          Posted {moment(post.createdAt).fromNow()}
                        </p>
                      </Link>
                    );
                  }),
                )}
            </div>
          )}

          {/* Likes */}
          {activeTab === "likes" && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-gray-700 my-auto">No liked posts yet!</p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Edit Profile Modal */}
      {showEdit && <EditModal setShowEdit={setShowEdit} />}
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
