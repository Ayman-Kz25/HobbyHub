import { useEffect, useState } from "react";
import { connectionsData } from "../data/data";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";

const Explore = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "/api/user/find",
          { input },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          },
        );

        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput("");
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchUser = async () => {
      const token = await getToken();
      dispatch(fetchUser(token));
    };
    searchUser();
  }, [dispatch, getToken]);

  return (
    <div className="explore-container no-scrollbar">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title & Subtitle */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Explore
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Find People with Similar Passion and Interests
          </p>
        </div>

        {/* Search bar */}
        <div className="searchbar-container">
          <div className="p-6">
            <div className="relative">
              <Search size={24} className="search-icon" />
              <input
                type="text"
                placeholder="Search People by Name, Username, Bio, or Hobby..."
                className="search-input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* User Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>

        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
};
export default Explore;
