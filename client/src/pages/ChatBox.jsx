import React, { useEffect, useRef, useState } from "react";
import { messagesData, userData } from "../data/data";
import { Image, ImageIcon, SendIcon, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios.js";
import { addMessages, fetchMsgs, resetMessages } from "../features/chats/chatsSlice.js";
import toast from "react-hot-toast";

const ChatBox = () => {
  const {msgs = []} = useSelector((state)=>state.chats);
  const {userId} = useParams();
  const {getToken} = useAuth();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [user, setUser] = useState(null);
  const msgsEndRef = useRef(null);
  
  const friends = useSelector((state)=>state.friends.friends);

  const fetchUserMsgs = async () => {
    try {
      const token = await getToken();
      dispatch(fetchMsgs({token, userId}))
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMsg = async () => {
    try {
      if(!text && !media) return
      const token = await getToken();
      const formData = new FormData();
      formData.append('reciever_id', userId);
      formData.append('text', text);
      media && formData.append('media', media);

      const {data} = await api.post('/api/chat/send', formData, {
        headers: {Authorization: `Bearer ${token}`}
      })

      if(data.success){
        setText('');
        setMedia(null);
        dispatch(addMessages(data.message))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    fetchUserMsgs()
    return ()=>{
      dispatch(resetMessages());
    }
  }, [userId]);

  useEffect(()=>{
    if(friends.length > 0){
      const user = friends.find(friend => friend._id === userId);
      setUser(user);
    }
  },[friends, userId])

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    user && (
      <div className="chat-box">
        <div className="chat-top-bar">
          <img
            src={user.profile_pic}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-sm text-gray-400 -mt-1.5">@{user.user_name}</p>
          </div>
        </div>
        <div className="flex-1 p-5 md:px-10 overflow-y-scroll no-scrollbar">
          <div className="space-y-4 max-w-4xl mx-auto">
            {msgs
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender._id !== user._id ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`p-2 text-sm max-w-sm bg-gray-50 text-gray-900 rounded-xl shadow ${msg.sender._id !== user._id ? "rounded-bl-none" : "rounded-br-none"}`}
                  >
                    {/* Image */}
                    {msg.msgType === "image" && msg.media && (
                      <img
                        src={msg.media.url}
                        alt=""
                        className="w-full max-w-sm rounded-xl mb-1"
                      />
                    )}

                    {/* Video */}
                    {msg.msgType === "video" && msg.media && (
                      <video
                        src={msg.media.url}
                        controls
                        className="w-full max-w-sm rounded-xl mb-1"
                      />
                    )}

                    {/* Text */}
                    {msg.msgType === "text" && <p>{msg.text}</p>}
                  </div>
                </div>
              ))}
            <div ref={msgsEndRef} />
          </div>
        </div>
        {/* Bottom Msg Bar */}
        <div className="px-3 sm:px-6 py-4 bg-gray-50">
          <div className="relative max-w-4xl mx-auto">
            {media && (
              <div className="mb-3 relative w-fit">
                {media.type.startsWith("image") ? (
                  <img
                    src={URL.createObjectURL(media)}
                    alt=""
                    className="h-20 rounded-lg shadow"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(media)}
                    alt=""
                    className="h-20 rounded-lg shadow"
                  />
                )}

                <button
                  onClick={() => setMedia(null)}
                  className="absolute -top-2 -right-2 bg-black/40 text-gray-50 text-xs px-0.5 py-0.5 rounded-full cursor-pointer hover:bg-black/60"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Input Row */}
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              {/* Media Btn */}
              <label htmlFor="media" className="cursor-pointer shrink-0">
                <ImageIcon
                  size={22}
                  className="text-gray-500 hover:border-e-gray-800 transition"
                />

                <input
                  type="file"
                  id="media"
                  accept="image/*,video/*"
                  hidden
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </label>
              <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e)=>e.key === 'Enter' && sendMsg()}
                />

                {/* Send Btn */}
                <button onClick={sendMsg} disabled={!text && !media} className=" flex items-center gap-2 shrink-0 bg-gradient-to-r from-[#ECC154] to-amber-200 hover:to-[#e0b23c] disabled:opacity-50 text-gray-900 text-sm font-medium px-4 py-1.5 transition rounded-full active:scale-95 not-disabled:cursor-pointer">
                  Send
                  <SendIcon size={16} />
                </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;
