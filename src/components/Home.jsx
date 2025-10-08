import React from 'react'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthProvider'
import ListItems from './Listtems'
import Video from './Video'


const Home = () => {
  const {data , loading} = useAuth()
  console.log(data)
  return (
    <div className='flex mt-20'>
      <Sidebar/>
      <div className='h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden'>
        <ListItems/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
           {Array.isArray(data) &&
              data.map((item, index) => {
                // Log to inspect the structure
                console.log("Video item:", item);

                // ✅ Adjust depending on your API structure
                const video = item.video || item; // fallback if no 'video' field

                return (
                  <Video
                    key={video?.videoId || video?.id || index}
                    video={video}
                  />
                );
              })}
        </div>
      </div>
    </div>
  )
}

export default Home