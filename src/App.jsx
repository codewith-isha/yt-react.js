import React from 'react'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthProvider'
import Home from "./components/Home"
import Loading from './loader/Loading'
import { Route , Routes } from 'react-router-dom'
import Search from './components/Search'
import PlayingVideo from "./components/PlayingVideo"

const  App= () => {
  const {loading} =useAuth()
  return (
    <div>
      {loading && <Loading/>}
      <Navbar/>
     <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path='/search/:searchQuery' element={<Search/>}/>
      <Route path='/video/:id' element={<PlayingVideo/>}/>
     </Routes>
    </div>
  )
}

export default App