import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  if (!video) return null;

  const videoId = video.id;
  const snippet = video.snippet || {};
  const statistics = video.statistics || {};

  const thumbnail =
    snippet?.thumbnails?.high?.url ||
    "https://via.placeholder.com/300x200?text=No+Thumbnail";

  const title = snippet?.title ?? "Untitled Video";
  const channelTitle = snippet?.channelTitle ?? "Unknown Channel";
  const views = statistics?.viewCount || null;
  const publishedAt = snippet?.publishedAt
    ? new Date(snippet.publishedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Some time ago";

  return (
    <Link to={`/video/${videoId}`} className="group w-full">
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-300">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 md:h-56 object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200.png?text=No+Thumbnail";
          }}
        />
        {video.contentDetails?.duration && (
          <Time time={video.contentDetails.duration} />
        )}
      </div>

      {/* Video Info */}
      <div className="flex mt-3 space-x-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-[#222]">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              channelTitle
            )}&background=random`}
            alt={channelTitle}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text Info */}
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="text-sm md:text-base font-semibold line-clamp-2 text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
            {channelTitle}
            <BsFillCheckCircleFill className="ml-1 text-[10px] md:text-[12px]" />
          </p>

          {views && (
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {`${abbreviateNumber(views, 2)} views · ${publishedAt}`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Video;
