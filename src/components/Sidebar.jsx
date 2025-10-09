import React from "react";
import {
  GoHome,
  GoHistory,
} from "react-icons/go";
import {
  SiYoutubeshorts,
  SiYoutubestudio,
  SiYoutubemusic,
  SiYoutubekids,
  SiTrendmicro,
} from "react-icons/si";
import {
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
  MdPodcasts,
} from "react-icons/md";
import {
  PiUserSquareThin,
  PiFilmSlateLight,
  PiLightbulbLight,
} from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike, AiFillYoutube } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper, FaChevronRight } from "react-icons/fa6";
import { TfiCup } from "react-icons/tfi";
import { SiStylelint } from "react-icons/si";
import { BiVideo } from "react-icons/bi";

function Sidebar() {
  const sections = [
    {
      title: null,
      items: [
        { id: 1, name: "Home", icon: <GoHome /> },
        { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
        { id: 3, name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
      ],
    },
    {
      title: "You",
      items: [
        { id: 1, name: "Your Channel", icon: <PiUserSquareThin /> },
        { id: 2, name: "History", icon: <GoHistory /> },
        { id: 3, name: "Playlists", icon: <MdOutlineSubscriptions /> },
        { id: 4, name: "Your Videos", icon: <BiVideo /> },
        { id: 5, name: "Watch Later", icon: <MdOutlineWatchLater /> },
        { id: 6, name: "Liked Videos", icon: <AiOutlineLike /> },
      ],
    },
    {
      title: "Explore",
      items: [
        { id: 1, name: "Trending", icon: <SiTrendmicro /> },
        { id: 2, name: "Shopping", icon: <HiOutlineShoppingBag /> },
        { id: 3, name: "Music", icon: <SiYoutubemusic /> },
        { id: 4, name: "Films", icon: <PiFilmSlateLight /> },
        { id: 5, name: "Live", icon: <CgMediaLive /> },
        { id: 6, name: "Gaming", icon: <IoGameControllerOutline /> },
        { id: 7, name: "News", icon: <FaRegNewspaper /> },
        { id: 8, name: "Sport", icon: <TfiCup /> },
        { id: 9, name: "Courses", icon: <SiStylelint /> },
        { id: 10, name: "Fashion & Beauty", icon: <PiLightbulbLight /> },
        { id: 11, name: "Podcasts", icon: <MdPodcasts /> },
      ],
    },
    {
      title: "More from YouTube",
      items: [
        { id: 1, name: "YouTube Premium", icon: <AiFillYoutube /> },
        { id: 2, name: "YouTube Studio", icon: <SiYoutubestudio /> },
        { id: 3, name: "YouTube Music", icon: <SiYoutubemusic /> },
        { id: 4, name: "YouTube Kids", icon: <SiYoutubekids /> },
      ],
    },
  ];

  return (
    <aside
      className="
        w-[250px] lg:w-[280px]
        h-[calc(100vh-4rem)]
        bg-[#f9f9f9]
        dark:bg-[#0f0f0f]
        text-gray-900 dark:text-gray-100
        py-4 px-3
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
      "
    >
      <div className="flex-1 overflow-y-hidden hover:overflow-y-auto pr-1">
        {sections.map((section, index) => (
          <div key={index} className="mb-5">
            {section.title && (
              <div className="flex items-center justify-between text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 px-2">
                <span>{section.title}</span>
                <FaChevronRight className="text-xs" />
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-5 px-3 py-2 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <div className="text-lg">{item.icon}</div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
            {index !== sections.length - 1 && (
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-[11px] text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed mt-auto px-2">
        <p>About • Press • Copyright</p>
        <p>Contact us • Creators</p>
        <p>Advertise • Developers</p>
        <p className="pt-2">Terms • Privacy • Policy & Safety</p>
        <p>How YouTube Works</p>
        <p>Test new features</p>
        <p className="pt-2 text-gray-500">© 2025 Learn Isha</p>
      </div>
    </aside>
  );
}

export default Sidebar;
