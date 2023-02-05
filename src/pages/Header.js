import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <nav className="fixed z-10 w-full mx-auto bg-dark border-gray-200 px-2 sm:px-4 py-3.5 rounded drop-shadow-lg">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <span className="flex flex-row items-center self-center text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-white">
              <img
                className="mr-2"
                src="/dumbbell.png"
                width="60"
                height="80"
                alt="FitChain"
              />
              GymBoi
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
