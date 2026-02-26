import { NavLink } from "react-router-dom";
import { menuItems } from "../data/data";

const MenuItems = ({ setOpenSidebar }) => {
  return (
    <div className="menu-container">
      {menuItems.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={() => setOpenSidebar(false)}
          className={({isActive}) =>
            `nav-item ${isActive 
              ? "bg-[#ECC154] text-gray-950" 
              : "text-gray-300 hover:bg-gray-200 hover:text-gray-950"}`
          }
        >
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </div>
  );
};
export default MenuItems;
