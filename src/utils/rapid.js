import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchData = async (url,params ={}) => {
  try {
    const {data}= await axios.get(`${BASE_URL}/${url}`, {
      params: {
        ...params,  
        key: API_KEY,
      },
    });

    console.log("YouTube API Data:", data);
    return data;
  } catch (error) {
    console.error(" Error fetching API data:", error.data || error);
    throw error;
  }
};


