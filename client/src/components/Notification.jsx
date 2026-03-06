import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const Notification = ({t, msg}) => {
    const navigate = useNavigate();
    
    const sender = msg.sender_id;
    const senderId = sender?._id || msg.sender_id;

  return (
    <div className="max-w-sm w-full bg-gray-50 shadow-lg rounded-lg flex border border-gray-300 hover:scale-105 transition transform">
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <img
            src={sender.profile_pic}
            alt=""
            className="h-10 w-10 rounded-full flex-shrink-0 mt-0.5 object-cover"
          />
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {sender.full_name}
            </p>
            <p className="text-sm text-gray-500">{msg.text?.slice(0, 50)}</p>
          </div>
        </div>
        <div className="flex mt-3 border-t border-gray-200">
          <button
            onClick={() => {if(senderId) navigate(`/chats/${senderId}`);
              toast.dismiss(t.id);
            }}
            className="ml-auto px-4 py-2 font-semibold text-amber-400 hover:bg-gray-100 transition rounded-b-lg"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
export default Notification