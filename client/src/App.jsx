import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Chats from "./pages/Chats";
import ChatBox from "./pages/ChatBox";
import Friends from "./pages/Friends";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Layout from "./pages/Layout";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchFriends } from "./features/friends/friendsSlice";
import { addMessages } from "./features/chats/chatsSlice";
import Notification from "./components/Notification";

const App = () => {
  const pathname = useLocation();
  const { user } = useUser();
  const { getToken } = useAuth();
  const pathnameRef = useRef(pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchUser(token));
        dispatch(fetchFriends(token));
      }
    };

    fetchData();
  }, [user, getToken, dispatch]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_BASEURL}/api/chat/${user?.id}`,
      );

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (pathnameRef.current === `/chat/${message.sender_id._id}`) {
          dispatch(addMessages(message));
        } else {
          toast.custom((t)=>(
            <Notification t={t} msg={message}/> 
          ), {position: "bottom-right"})
        }
      };
      return () => {
        eventSource.close();
      };
    }
  }, [user, dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="chats" element={<Chats />} />
          <Route path="chats/:userId" element={<ChatBox />} />
          <Route path="friends" element={<Friends />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
