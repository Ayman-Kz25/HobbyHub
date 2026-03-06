import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const RecentMessages = () => {
  const [msgs, setMsgs] = useState([]);
  const {user} = useUser()
  const {getToken} = useAuth()

  const fetchRecentMsgs = async () => {
    try {
      const token = await getToken();
      const {data} = await api.get('/api/user/recent-chat', {
        headers: {Authorization: `Bearer ${token}`}
      })
      if(data.success){
        //Group msgs by the sender and get the recent msgs from each sender
        const grpMsg = data.msgs?.reduce((acc, msg)=>{
          const senderId = msg.sender_id?._id || {};

          if(!acc[senderId] || new Date(msg.createdAt) > new Date(acc[senderId].createdAt)){
            acc[senderId] = msg
          }
          return acc;
         }, {})

        //sort msgs by date
        const sortMsgs = Object.values(grpMsg).sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));

        setMsgs(sortMsgs);
      } else {
        console.log(data.message)
        toast.error(data.message);
      }
      // console.log(msgs)
    } catch (error) {
      console.log(error.message)
        toast.error(error.message);
    }
  };

  useEffect(() => {
    if(user){
      fetchRecentMsgs();
      const intId = setInterval(fetchRecentMsgs, 3000);
      return ()=>{clearInterval(intId)}
    }
  }, [user]);

  return (
    <div className="msg-container">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Chats</h3>
      <div className="msg-box">
        {msgs.map((msg) => (

          <Link
            key={msg._id}
            to={`/chats/${msg.sender_id._id}`}
            className="flex items-start gap-2 py-2 hover:bg-gray-100 transition"
          >
            <img
              src={msg.sender_id.profile_pic}
              alt=""
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-medium">{msg.sender_id.full_name}</p>
                <p className="text-[10px] text-gray-400">
                  {moment(msg.createdAt).fromNow()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">{msg.text ? msg.text : "Media"}</p>
                {!msg.seen && <p className="bg-[#ECC154] text-gray-950 w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  {msgs.length}
                </p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RecentMessages;
