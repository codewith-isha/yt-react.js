import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapid.js";
import Sidebar from "./Sidebar.jsx";
import SearchCard from "./SearchCard.jsx";

function Search() {
  const [results, setResults] = useState([]);
  const { searchQuery } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if(!searchQuery) return;
      try {
        const data = await fetchData("search", {
          part: "snippet",
          q: encodeURIComponent(searchQuery),
          type: "video",
          maxResults: 30,
        });

        // Map data to match SearchCard props
       
      const mappedResults = data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      }));

      setResults(mappedResults);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen fixed top-0 left-0 z-10 bg-white border-r border-gray-200 overflow-y-auto pt-16">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 pt-16 h-screen overflow-y-auto bg-[#f9f9f9] p-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {results.map((video, index) => (
              <SearchCard key={index} video={video} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
