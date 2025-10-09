import React, { useState } from "react";

function ListItems() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Music",
    "React Routers",
    "Computer Programming",
    "Reverberation",
    "Movie Musicals",
    "India National Cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telugu Cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian Soap Opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];

  return (
    <div className="w-full bg-[#f9f9f9] dark:bg-[#0f0f0f] overflow-x-auto no-scrollbar">
      <div className="flex space-x-3 px-4 py-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 
              ${
                activeCategory === category
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-[#222] text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#333]"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListItems;
