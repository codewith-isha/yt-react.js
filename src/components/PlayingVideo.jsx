import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapid";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "./SuggestedVideo";

function PlayingVideo() {
  const [video, setVideo] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchVideoDetails();
      fetchRelatedVideos();
    }
  }, [id]);

  const fetchVideoDetails = async () => {
    try {
      const res = await fetchData("videos", {
        part: "snippet,statistics,contentDetails",
        id,
      });
      setVideo(res.items?.[0]);
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const res = await fetchData("search", {
        part: "snippet",
        relatedToVideoId: id,
        type: "video",
        maxResults: 30,
      });
      setRelatedVideo(res.items || []);
    } catch (err) {
      console.error("Error fetching related videos:", err);
    }
  };

  if (!video)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  const { snippet, statistics } = video;
  const { title, channelTitle, description } = snippet;

  return (
    <div className="flex flex-col lg:flex-row pt-16 bg-[#f9f9f9] dark:bg-[#0f0f0f] min-h-screen">
      {/* ===== Main Video Section ===== */}
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 lg:py-6">
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Title */}
        <h1 className="mt-4 text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
          {title}
        </h1>

        {/* Channel & Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-[#222]">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  channelTitle
                )}&background=random`}
                alt={channelTitle}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                {channelTitle}
                <BsFillCheckCircleFill className="ml-1 text-gray-600 dark:text-gray-400 text-[12px]" />
              </p>
              <span className="mt-1 inline-block bg-red-600 hover:bg-red-700 transition text-white px-4 py-1.5 rounded-full font-medium cursor-pointer text-xs md:text-sm">
                Subscribe
              </span>
            </div>
          </div>

          <div className="flex space-x-3 mt-3 md:mt-0">
            <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-gray-100 dark:bg-white/[0.1] hover:bg-gray-200 dark:hover:bg-white/[0.15] transition text-white">
              <AiOutlineLike className="mr-2 text-lg text-white" />
              {statistics?.likeCount
                ? `${abbreviateNumber(statistics.likeCount, 2)} Likes`
                : "Like"}
            </div>
            <div className="flex items-center justify-center h-11 px-4 rounded-3xl text-white bg-gray-100 dark:bg-white/[0.1]">
              {statistics?.viewCount
                ? `${abbreviateNumber(statistics.viewCount, 2)} Views`
                : "Views"}
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="mt-4 p-4 bg-gray-100 dark:bg-[#222] rounded-xl text-sm md:text-base whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {description}
        </div>
      </div>

      {/* ===== Related Videos ===== */}
      <div className="lg:w-[350px] xl:w-[400px] flex-shrink-0 px-4 py-6 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16 space-y-4">
        {relatedVideo.map((item, index) => (
          <SuggestedVideo key={index} video={item} />
        ))}
      </div>
    </div>
  );
}

export default PlayingVideo;
