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
    <div className="w-full bg-[#0f0e0e]">
      <div className="flex space-x-3 px-4 py-3 overflow-x-auto scrollbar-hide">
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
