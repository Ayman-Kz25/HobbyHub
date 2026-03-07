import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { userData } from "../data/data";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const [openSidebar, setOpenSidebar] = useState(false);

  return user ? (
    <div className="w-full h-screen flex">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
      {openSidebar ? (
        <X size={36} className="btn" onClick={() => setOpenSidebar(false)} />
      ) : (
        <Menu size={36} className="btn" onClick={() => setOpenSidebar(true)} />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
