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
  const views = statistics?.viewCount || 0;
  const publishedAt = snippet?.publishedAt
    ? new Date(snippet.publishedAt).toDateString()
    : "Some time ago";

  return (
    <div>
      <Link to={`/video/${videoId}`}>
        <div className="flex flex-col">
          <div className="relative h-48 md:h-56 rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={thumbnail}
              alt={title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200.png?text=No+Thumbnail";
              }}
            />
            {video.contentDetails?.duration && (
              <Time time={video.contentDetails.duration} />
            )}
          </div>

          <div className="flex mt-3 space-x-2">
            <div className="flex h-9 w-9 rounded-full overflow-hidden border bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  channelTitle
                )}&background=random`}
                alt={channelTitle}
              />
            </div>

            <div>
              <span className="text-sm font-bold line-clamp-2">{title}</span>
              <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-600">
                {channelTitle}
                <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
              </span>
              <div className="flex text-gray-500 text-[12px]">
                <span>{`${abbreviateNumber(views, 2)} views`}</span>
                <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">·</span>
                <span>{publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;
