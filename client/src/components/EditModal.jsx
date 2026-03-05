import { useState } from "react";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const EditModal = ({ setShowEdit }) => {
  const user = useSelector((state) => state.user.value);
  const [editForm, setEditForm] = useState({
    username: user.user_name,
    bio: user.bio,
    location: user.location,
    profile_pic: null,
    cover_photo: null,
    full_name: user.full_name,
  });
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  const handleSaveBtn = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      const { full_name, username, bio, location, profile_pic, cover_photo } =
        editForm;

      userData.append("user_name", username);
      userData.append("full_name", full_name);
      userData.append("bio", bio);
      userData.append("location", location);
      profile_pic && userData.append("profile", profile_pic);
      cover_photo && userData.append("cover", cover_photo);

      const token = await getToken();
      dispatch(
        updateUser({
          userData,
          token,
        }),
      );

      setShowEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50 no-scrollbar">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-gray-50 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form
            action=""
            className="space-y-4"
            onSubmit={(e) =>
              toast.promise(handleSaveBtn(e), { loading: "Saving..." })
            }
          >
            {/* Profile Pic */}
            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="profile_pic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Pic
                <input
                  type="file"
                  id="profile_pic"
                  hidden
                  accept="image/*"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  onChange={(e) =>
                    setEditForm({ ...editForm, profile_pic: e.target.files[0] })
                  }
                />
                <div className="group/profile relative">
                  <img
                    src={
                      editForm.profile_pic
                        ? URL.createObjectURL(editForm.profile_pic)
                        : user.profile_pic
                    }
                    alt=""
                    className="w-24 h-24 rounded-full object-cover mt-2"
                  />

                  <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center cursor-pointer">
                    <Pencil size={22} className="text-gray-50" />
                  </div>
                </div>
              </label>
            </div>

            {/* Cover Photo */}
            <div className="flex flex-col items-start gap-3">
              <label
                htmlFor="cover_photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover Photo
                <input
                  type="file"
                  id="cover_photo"
                  hidden
                  accept="image/*"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  onChange={(e) =>
                    setEditForm({ ...editForm, cover_photo: e.target.files[0] })
                  }
                />
                <div className="group/cover relative">
                  <img
                    src={
                      editForm.cover_photo
                        ? URL.createObjectURL(editForm.cover_photo)
                        : user.cover_photo
                    }
                    alt=""
                    className="w-80 h-40 rounded-xl bg-gradient-to-r bg-gray-200 via-neutral-200 to-zinc-200 object-cover mt-2"
                  />

                  <div className="absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-xl items-center justify-center cursor-pointer">
                    <Pencil size={22} className="text-gray-50" />
                  </div>
                </div>
              </label>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none"
                placeholder="Enter Full Name"
                onChange={(e) =>
                  setEditForm({ ...editForm, full_name: e.target.value })
                }
                value={editForm.full_name}
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none"
                placeholder="Enter Username"
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                value={editForm.username}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                className="w-full resize-none p-3 border-2 border-gray-200 rounded-lg focus:outline-none"
                placeholder="Enter Bio"
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                value={editForm.bio}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none"
                placeholder="Enter Location"
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                value={editForm.location}
              />
            </div>

            {/* Action Btns */}
            <div className="cta-btn">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
