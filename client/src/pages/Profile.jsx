import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postsData, userData } from "../data/data";
import Loading from "../components/Loading";
import ProfileInfo from "../components/ProfileInfo";
import PostCard from "../components/PostCard";
import moment from "moment";
import EditModal from "../components/EditModal";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    const currentUser = userData;
    setUser(currentUser);
    const userPosts = postsData.filter(
      (post) => post.user._id === currentUser._id,
    );
    setPosts(userPosts);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const likedPost = postsData.filter((post) => post.likes?.includes(user?._id));

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
                .filter((post) => post.media && post.media.length > 0)
                .map((post) => (
                  <>
                    {post.media.map((item, index) => (
                      <Link
                        key={`${post._id}-${index}`}
                        target="_blank"
                        to={item.url}
                        className="relative group"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt=""
                            className="w-64 aspect-video object-cover max-sm:pb-1"
                          />
                        ) : (
                          <video
                            src={item.url}
                            className="w-64 aspect-video object-cover max-sm:pb-1"
                          />
                        )}
                        <p className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-gray-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-sm">
                          Posted {moment(post.createdAt).fromNow()}
                        </p>
                      </Link>
                    ))}
                  </>
                ))}
            </div>
          )}

          {/* Likes */}
          {activeTab === "likes" && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {likedPost.length > 0 ? (
                likedPost.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-gray-700">No liked posts yet!</p>
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
