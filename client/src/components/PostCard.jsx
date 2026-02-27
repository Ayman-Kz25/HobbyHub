import { BadgeCheck } from "lucide-react"

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            {/* User Info */}
            <div className="user-info">
                <img src={post.user.profile_pic} alt="" className="profile-pic" />
                <div>
                    <div className="flex items-center space-x-1">
                        <span>{post.user.full_name}</span>
                        <BadgeCheck size={24} color="#ECC154"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard