import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapid";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "./SuggestedVideo";
import { BsFillCheckCircleFill } from "react-icons/bs";

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
        part: "snippet,statistics",
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
        maxResults: 20,
      });
      setRelatedVideo(res.items || []);
    } catch (err) {
      console.error("Error fetching related videos:", err);
    }
  };

  if (!video) return <div className="text-center mt-10">Loading...</div>;

  const { snippet, statistics } = video;
  const { title, channelTitle, description } = snippet;

  return (
    <div className="flex justify-center flex-row h-[70%] mt-16">
      <div className="w-full flex flex-col lg:flex-row">
        {/* ===== Video Section ===== */}
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6">
          <div className="h-[500px] md:h-[700px] w-full flex justify-center items-center bg-black rounded-xl overflow-hidden">
            <iframe
              width="90%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">{title}</div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <div className="text-md font-semibold flex items-center">
                  {channelTitle}
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                </div>
              </div>
              <span className="ml-5 text-center bg-red-500 px-3 pt-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200">
                Subscribe
              </span>
            </div>

            <div className="flex mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl mr-2" />
                {`${abbreviateNumber(statistics?.likeCount, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {`${abbreviateNumber(statistics?.viewCount, 2)} Views`}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm whitespace-pre-wrap">
            {description}
          </div>
        </div>

        {/* ===== Related Videos ===== */}
        <div className="flex flex-col px-4 py-6 h-[calc(100vh-4.625rem)] overflow-y-scroll overflow-x-hidden lg:w-[350px] xl:w-[400px]">
          {relatedVideo.map((item, index) => (
            <SuggestedVideo key={index} video={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayingVideo;
