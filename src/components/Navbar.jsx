import React, { useState } from "react";
import Avatar from "react-avatar";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ onToggleSidebar }) {
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#f9f9f9] dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      {/* ===== Left - Logo & Menu ===== */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#020202] transition-colors duration-200"
        >
          <IoMenu className="text-2xl text-white" />
        </button>

        <img
          src={logo}
          alt="YouTube"
          className="w-24 cursor-pointer object-contain"
        />
      </div>

      {/* ===== Middle - Search Bar ===== */}
      <div className="hidden sm:flex items-center w-[45%] max-w-[600px]">
        <div className="flex flex-1 border border-gray-300 dark:border-gray-700 rounded-l-full overflow-hidden bg-white dark:bg-[#121212]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={searchQueryHandler}
          />
        </div>

        <button
          className="px-5 py-[10px] border border-gray-300 dark:border-gray-700 border-l-0 rounded-r-full bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors duration-200"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={22} className="text-gray-700 dark:text-gray-300" />
        </button>

        <div className="ml-3 flex items-center justify-center bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] transition-colors duration-200 rounded-full p-2 cursor-pointer">
          <IoMdMic size={22} className="text-gray-700 dark:text-gray-300" />
        </div>
      </div>

      {/* ===== Right - Icons & Avatar ===== */}
      <div className="flex items-center space-x-4 sm:space-x-5">
        <RiVideoAddFill className="text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-[#222] p-2 rounded-full transition" />
        <AiFillBell className="text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-[#222] p-2 rounded-full transition" />
        <Avatar
          size="36"
          round={true}
          name="Profile"
          className="cursor-pointer shadow-sm"
        />
      </div>
    </header>
  );
}

export default Navbar;
