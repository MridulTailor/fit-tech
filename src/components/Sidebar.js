import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoFitness } from "react-icons/io5";
import { FaStore } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import VoiceInput from "./VoiceInput";
// import { ConnectKitButton } from "connectkit";
const NavItem = ({ link, icon, name }) => {
  return (
    <li>
      <Link
        to={link}
        className="flex justify-center sm:justify-start items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
      >
        {icon}
        <span className="hidden md:flex md:ml-3 text-lg text-gray-600">
          {name}
        </span>
      </Link>
    </li>
  );
};
const Sidebar = () => {
  const navItemObj = [
    // {
    //   link: "/",
    //   icon: (
    //     <MdOutlineDashboardCustomize className="text-[#4ce0d9]" size={25} />
    //   ),
    //   name: "Dashboard",
    // },
    {
      link: "/prediction",
      icon: <IoFitness className="text-[#4ce0d9]" size={25} />,
      name: "Calorie Burnt",
    },
    {
      link: "/products",
      icon: <FaStore className="text-[#4ce0d9]" size={25} />,
      name: "Our Products",
    },
    // {
    //   link: "/profile",
    //   icon: <CgProfile className="text-[#4ce0d9]" size={25} />,
    //   name: "Profile",
    // },
  ];
  return (
    <aside className="min-h-[calc(100vh-5rem)] h-[inherit] md:w-64 rounded-[8px] bg-gray-50">
      <div className="min-h-[calc(100vh-5rem)] md:px-3 py-4 overflow-y-auto h-full flex flex-col justify-between">
        <div>
          <Link
            to="/"
            className="flex justify-center sm:justify-start items-center mb-5"
          >
            <img
              src="/logo.png"
              width="50"
              height="50"
              className="h-8 md:mr-3 sm:h-10"
              alt="Fit Chain"
            />
            <span className="hidden md:flex self-center text-2xl font-bold whitespace-nowrap text-[#008dff]">
              GymBoi
            </span>
          </Link>
          <ul className="space-y-2">
            {navItemObj.map((item) => (
              <NavItem
                key={item.link}
                link={item.link}
                icon={item.icon}
                name={item.name}
              />
            ))}
          </ul>
        </div>
        <div className="relative b-0 flex items-center justify-center mb-3">
          <VoiceInput />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
