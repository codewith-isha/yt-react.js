import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Time from "../loader/Time";
import { abbreviateNumber } from "js-abbreviation-number";

function SearchCard({ video }) {
  const thumbnailUrl =
    video.thumbnail?.url ||
    "https://via.placeholder.com/480x360?text=No+Thumbnail";
    //  console.log(`${thumbnailUrl}`)
    console.log(video)
  const authorAvatarUrl =
    video.author?.avatar?.[0]?.url ||
    "https://via.placeholder.com/40?text=Avatar";
  const authorName = video.channelTitle?.title || "Unknown Channel";
  const videoTitle = video.title || "No Title";
  const descriptionSnippet = video.descriptionSnippet || "";
  const views = video.stats?.views || 0;
  const publishedTime = video.publishedTimeText || "";
  const lengthSeconds = video.lengthSeconds;
  const isVerified = video.author?.badges?.[0]?.type === "VERIFIED_CHANNEL";

  return (
    <Link to={`/video/${video.videoId}`} className="group">
      <div className="flex flex-col md:flex-row mb-6 md:mb-4 cursor-pointer hover: p-2 rounded-lg transition-all duration-200">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-full md:w-80 h-48 rounded-xl overflow-hidden bg-black">
          <img
            src={thumbnailUrl}
            alt={videoTitle}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
         
          {lengthSeconds && (
            <Time
              time={lengthSeconds}
              className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded-sm"
            />
          )}
        </div>

        {/* Video Info */}
        <div className="flex flex-col ml-0 md:ml-4 mt-3 md:mt-0 overflow-hidden">
          <h3 className="text-sm md:text-base font-semibold line-clamp-2 hover:underline">
            {videoTitle}
          </h3>

          <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
            {descriptionSnippet}
          </p>

          <div className="flex items-center mt-3">
            {/* Author Avatar */}
            <div className="flex-shrink-0 h-9 w-9 rounded-full overflow-hidden bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={authorAvatarUrl}
                alt={authorName}
              />
            </div>

            <div className="flex flex-col ml-3">
              <span className="text-xs md:text-sm font-semibold flex items-center">
                {authorName}
                {isVerified && (
                  <BsFillCheckCircleFill className="ml-1 text-[12px] text-gray-500" />
                )}
              </span>

              <div className="flex text-xs md:text-sm text-gray-500 mt-0.5">
                <span>{`${abbreviateNumber(views, 1)} views`}</span>
                {publishedTime && (
                  <>
                    <span className="mx-1">·</span>
                    <span>{publishedTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
