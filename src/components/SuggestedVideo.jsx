import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import Time from "../loader/Time";

function SuggestedVideo({ video }) {
  if (!video) return null;

  const videoId = video.id?.videoId || video.id;
  const snippet = video.snippet || {};

  const title = snippet.title || "Untitled Video";
  const channelTitle = snippet.channelTitle || "Unknown Channel";
  const thumbnail =
    snippet.thumbnails?.high?.url ||
    "https://via.placeholder.com/300x200.png?text=No+Thumbnail";
  const publishedAt = snippet.publishedAt
    ? new Date(snippet.publishedAt).toDateString()
    : "Some time ago";

  return (
    <div>
      <Link to={`/video/${videoId}`}>
        <div className="flex mb-3">
          <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={thumbnail}
              alt={title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200.png?text=No+Thumbnail";
              }}
            />
          </div>

          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2">
              {title}
            </span>

            <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 flex items-center text-gray-700">
              {channelTitle}
              <BsFillCheckCircleFill className="text-gray-500 ml-1 text-[12px]" />
            </span>

            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-gray-500 truncate overflow-hidden">
              <span>{publishedAt}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestedVideo;
