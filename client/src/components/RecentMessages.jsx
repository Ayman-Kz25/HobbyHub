import { useEffect, useState } from "react"
import { recentMessages } from "../data/data";
import { Link } from "react-router-dom";

const RecentMessages = () => {

  const [msgs, setMsgs] = useState([]);

  const fetchRecentMsgs = async () => {
    setMsgs(recentMessages);
  }

  useEffect(()=>{
    fetchRecentMsgs()
  },[])

  return (
    <div className="msg-container">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Chats</h3>
      <div className="msg-box">
        {msgs.map((index, msg)=>(
          <Link
            key={index}
            className="flex items-start gap-2 py-2 hover:bg-gray-100"
          >
            <img src={msg.sender.profile_pic} alt="" className="w-8 h-8 rounded-full" />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default RecentMessages