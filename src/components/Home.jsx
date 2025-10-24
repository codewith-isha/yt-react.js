import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthProvider";
import ListItems from "./Listtems"; // ✅ category chips
import Video from "./Video";
import Loading from "../loader/Loading";

const Home = () => {
  const { data, loading } = useAuth();

  return (
    <div className="flex bg-[#f9f9f9] text-gray-900 dark:bg-[#0f0f0f] dark:text-gray-100">
      {/* ===== Sidebar (Fixed) ===== */}
      <aside className="fixed top-0 left-0 w-[250px] lg:w-[280px] h-screen border-r border-gray-200 dark:border-gray-800 bg-[#f9f9f9] dark:bg-[#0f0f0f] pt-16 z-20 ">
        <Sidebar />
      </aside>

      {/* ===== Main Content ===== */}
      <main className="ml-[250px] lg:ml-[280px] flex-1 min-h-screen overflow-y-auto pt-16 pb-10">
        {/* ===== Category List (Sticky Top) ===== */}
        <div className=" z-10 bg-[#f9f9f9] dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-4 py-2">
            <ListItems />
          </div>
        </div>

        {/* ===== Videos Section ===== */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Loading />
          </div>
        ) : data?.length > 0 ? (
          <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data.map((item, index) => {
              const video = {
                id: item.id?.videoId || item?.id,
                snippet: item?.snippet,
              };
              return <Video key={video.id || index} video={video} />;
            })}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-500">No videos found.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
