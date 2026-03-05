import { Link, useNavigate } from "react-router-dom"
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut } from "lucide-react";
import { UserButton, useClerk } from '@clerk/clerk-react'
import { userData } from "../data/data";
import { useSelector } from "react-redux";

const Sidebar = ({openSidebar, setOpenSidebar}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const {signOut} = useClerk()
  return (
    <div className={`sidebar-container ${openSidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}`}>
      <div className="w-full">
        <div className="w-32 my-2 mx-auto cursor-pointer">
          <img src="/logo-4.png" alt="Logo" onClick={()=>navigate('/')}/>
        </div>
        <hr className="border-gray-200 mb-8"/>

        <MenuItems setOpenSidebar={setOpenSidebar}/>

        <Link to='/create-post' className="post-btn">
          <CirclePlus className="w-5 h-5"/>
          Create Post
        </Link>
      </div>

      <div className="profile-btn">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div>
            <h1 className="text-sm font-medium">{user.full_name}</h1>
            <p className="text-xs text-gray-500">@{user.user_name}</p>
          </div>
        </div>
        <LogOut className="logout-btn" onClick={signOut}/>
      </div>
    </div>
  )
}
export default Sidebar