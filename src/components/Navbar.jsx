import React, { useState } from "react";
import Avatar from "react-avatar";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery.trim().length > 0
    ) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left - Logo & Menu */}
      <div className="flex items-center space-x-4">
        <IoMenu className="text-2xl cursor-pointer" />
        <img
          src={logo}
          alt="yt-logo"
          className="w-24 cursor-pointer object-contain"
        />
      </div>

      {/* Middle - Search Bar */}
      <div className="flex items-center w-[40%]">
        <div className="flex flex-1 border border-gray-400 rounded-l-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-1 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={searchQueryHandler}
          />
        </div>
        <button
          className="px-4 py-[9px] border border-gray-400 border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={24} />
        </button>
        <IoMdMic
          className="ml-3 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
          size={42}
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center space-x-5">
        <RiVideoAddFill className="text-2xl cursor-pointer" />
        <AiFillBell className="text-2xl cursor-pointer" />
        <Avatar size="32" round={true} name="Profile" />
      </div>
    </div>
  );
}

export default Navbar;
