import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postsData, userData } from "../data/data";
import Loading from "../components/Loading";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(userData);
    setPosts(postsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="profile-container">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="profile-card">
          {/* Cover Photo */}
          <div className="cover-photo">
            {user.cover_photo && (
              <img src={user.cover_photo} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          {/* User Info */}
          <ProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
