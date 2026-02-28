import { MapPin, MessageCircle, PlusCircle, UserPlus } from "lucide-react"
import { userData } from "../data/data"

const UserCard = ({user}) => {
    const currentUser = userData

    const handleFollow = async () => {

    }

    const handleFriendRequest = async () => {
        
    }
  return (
    <div key={user._id} className="user-card">
        <div className="text-center">
            <img src={user.profile_pic} alt="" className="rounded-full w-16 shadow-md mx-auto h-16"/>
            <p className="mt-4 font-semibold">{user.full_name}</p>
            {user.user_name && <p className="text-gray-500 font-light">@{user.user_name}</p>}
            {user.bio && <p className="text-gray-600 mt-2 text-center text-sm px-4">{user.bio}</p>}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                <MapPin size={18}/> {user.location}
            </div>
            <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                <span>{user.followers.length}</span> Followers
            </div>
        </div>

        <div className="flex mt-4 gap-2">
            {/* Follow Btn */}
            <button className="follow-btn" disabled={currentUser?.following.includes(user._id)} onClick={handleFollow}>
                <UserPlus size={18}/>
                {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
            </button>

            {/* Friend Request Btn / Chat Btn */}
            <button className="request-btn group" disabled={currentUser?.following.includes(user._id)} onClick={handleFriendRequest}>
                {currentUser?.connections.includes(user._id) 
                ? <MessageCircle size={20} className="group-hover:scale-105 transition"/>
                : <PlusCircle size={20} className="group-hover:scale-105 transition"/>
            }
            </button>
        </div>
    </div>
  )
}
export default UserCard