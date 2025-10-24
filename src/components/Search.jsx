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
      if (!searchQuery) return;
      try {
        // 1️⃣ Get search results
        const data = await fetchData("search", {
          part: "snippet",
          q: encodeURIComponent(searchQuery),
          type: "video",
          maxResults: 30,
        });

        const videoIds = data.items.map((item) => item.id.videoId).join(",");

        // 2️⃣ Get video details (views, duration, etc.)
        const details = await fetchData("videos", {
          part: "snippet,statistics,contentDetails",
          id: videoIds,
        });

        // 3️⃣ Map to SearchCard format
        const mappedResults = details.items.map((item) => ({
          videoId: item.id,
          title: item.snippet.title,
          descriptionSnippet: item.snippet.description,
          thumbnail: {
            url: item.snippet.thumbnails.high?.url ||
              "https://via.placeholder.com/480x360?text=No+Thumbnail",
          },
          channelTitle: { title: item.snippet.channelTitle },
          author: {
            avatar: [
              {
                url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  item.snippet.channelTitle
                )}&background=random`,
              },
            ],
            badges: [{ type: "VERIFIED_CHANNEL" }],
          },
          stats: { views: item.statistics.viewCount || 0 },
          publishedTimeText: new Date(item.snippet.publishedAt).toLocaleDateString(),
          lengthSeconds: item.contentDetails?.duration || 0,
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
      <div className="w-64 h-screen fixed top-0 left-0 z-10 bg-black border-r border-gray-200 overflow-y-auto pt-16">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 pt-16 h-screen overflow-y-auto bg-[#000000] text-white p-4">
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
