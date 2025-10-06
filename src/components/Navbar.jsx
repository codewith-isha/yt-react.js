import React from 'react'
import Avatar from 'react-avatar';
import { IoMenu } from "react-icons/io5";
import logo from '../assets/logo.png'
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { AiFillBell } from "react-icons/ai";
import profile from '../assets/profile.jpg'

const Navbar = () => {
  return (
    <div className='flex justify-between px-6 py-2'>
      <div className='space-x-4 flex items-center' >
       <IoMenu className='text-xl cursor-pointer' />
        <img src={logo} alt="yt-logo" className='w-28'/>
      </div>


      <div className=' flex w-[40%]'>
        <div className='w-[100%] px-3 py-2 rounded-l-full border'>
           <input type="text"  placeholder='search'
        className='outline-none'/>
        </div>

       <button className='px-4 py-2 border rounded-r-full bg-gray-100'>
         <CiSearch className='text-xl' />
       </button>
       
        <IoMdMic className='ml-3 rounded-full  p-2 cursor-pointer
        hover:bg-gray-200 duration-200'  size={'42px'} />

      </div>


      <div className='flex space-x-5 items-center '>
        <RiVideoAddFill  className='text-2xl'/>
        <AiFillBell  className='text-2xl'/>
          <Avatar src={profile} alt="profile"  size='32' round={true}/>


      </div>

    </div>
  )
}

export default Navbar