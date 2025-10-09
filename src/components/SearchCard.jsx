import React from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Time from "../loader/Time";
import { abbreviateNumber } from "js-abbreviation-number";

function SearchCard({ video }) {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col md:flex-row mb-6 md:mb-4">
        {/* Thumbnail */}
        <div className="relative flex h-48 w-full md:w-80 rounded-xl overflow-hidden">
          <img
            src={video.thumbnails[0].url}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          {video.lengthSeconds && <Time time={video.lengthSeconds} />}
        </div>

        {/* Video Info */}
        <div className="flex flex-col ml-0 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-xl font-semibold line-clamp-2">
            {video.title}
          </span>

          <span className="text-sm line-clamp-2 text-gray-600 mt-1">
            {video.descriptionSnippet}
          </span>

          <div className="flex items-center mt-2">
            <div className="flex-shrink-0 h-9 w-9 rounded-full overflow-hidden bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={video.author.avatar[0].url}
                alt={video.author.title}
              />
            </div>

            <div className="flex flex-col ml-3">
              <span className="text-sm font-semibold flex items-center">
                {video.author.title}
                {video.author.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="ml-1 text-[12px] text-gray-500" />
                )}
              </span>

              <div className="flex text-sm text-gray-500 mt-1">
                <span>{`${abbreviateNumber(video.stats.views || 0, 2)} views`}</span>
                <span className="mx-1">·</span>
                <span>{video.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
