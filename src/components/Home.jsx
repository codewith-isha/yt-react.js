import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthProvider";
import ListItems from "./Listtems"; // ✅ fixed typo
import Video from "./Video";

const Home = () => {
  const { data, loading } = useAuth();

  return (
    <div className="flex">
      {/* ===== Sidebar - fixed left ===== */}
      <div className="w-64 h-screen fixed top-0 left-0 z-10 bg-white border-r border-gray-200 overflow-y-auto pt-16">
        <Sidebar />
      </div>

      {/* ===== Main Content - shifted right by 64px ===== */}
      <div className="ml-64 flex-1 pt-16 h-screen overflow-y-auto bg-white">
        <div className="sticky top-0 bg-white z-10">
          <ListItems />
        </div>

        {/* ===== Video List ===== */}
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {data.map((item, index) => {
              const video = {
                id: item.id?.videoId || item.id,
                snippet: item.snippet,
              };
              return <Video key={video.id || index} video={video} />;
            })}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-500">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
