import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const Notification = ({t, msg}) => {
    const navigate = useNavigate();

  return (
    <div className="max-w-md w-full bg-gray-50 shadow-lg rounded-lg flex border border-gray-300 hover:scale-105 transition">
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <img
            src={msg.sender_id.profile_pic}
            alt=""
            className="h-10 w-10 rounded-full flex-shrink-0 mt-0.5"
          />
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {msg.sender_id.full_name}
            </p>
            <p className="text-sm text-gray-500">{msg.text.slice(0, 50)}</p>
          </div>
        </div>
        <div className="flex border border-gray-200">
          <button
            onClick={() => {
              navigate(`/chat/${msg.sender_id._id}`);
              toast.dismiss(t.id);
            }}
            className="p-4 font-semibold text-amber-400"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
export default Notification