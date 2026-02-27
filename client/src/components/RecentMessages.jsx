import { useEffect, useState } from "react";
import { recentMessages } from "../data/data";
import { Link } from "react-router-dom";
import moment from "moment";

const RecentMessages = () => {
  const [msgs, setMsgs] = useState([]);

  const fetchRecentMsgs = async () => {
    setMsgs(recentMessages);
  };

  useEffect(() => {
    fetchRecentMsgs();
  }, []);

  return (
    <div className="msg-container">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Chats</h3>
      <div className="msg-box">
        {msgs.map((msg) => (
          <Link
            key={msg._id}
            to={`/chats/${msg.sender._id}`}
            className="flex items-start gap-2 py-2 hover:bg-gray-100 transition"
          >
            <img
              src={msg.sender.profile_pic}
              alt=""
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-medium">{msg.sender.full_name}</p>
                <p className="text-[10px] text-gray-400">
                  {moment(msg.createdAt).fromNow()}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">{msg.text ? msg.text : "Media"}</p>
                {!msg.seen && <p className="bg-[#ECC154] text-gray-950 w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  1
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
