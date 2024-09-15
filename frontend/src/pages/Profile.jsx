import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../store/AuthSlice';

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userData)
  // console.log(user)

  const [userDetails, setUserDetails] = useState()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const userInfo = await axios.get('/api/v1/users/get-current-user')

      if (userInfo.data) {
        setUserDetails(userInfo.data)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  const handleLogout = async () => {
    const res = await axios.get('/api/v1/users/logout')
    toast.success(res.data.message)
    dispatch(logout())
    navigate('/')
  }

  const handleLikedPosts = () => {
    navigate('/profile/page/liked-posts')
  }

  const handleMyPosts = () => {
    navigate('/profile/page/my-posts')
  }

  return (
    <>
      <div className='w-full h-[92vh] absolute mt-[8vh] bg-[#212121]'>

        <button onClick={() => (navigate('/'))} className=' hidden fixed text-3xl ml-5 mt-5 bg-[#2667ff] rounded-full w-[40px] h-[40px] sm:flex justify-center'> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="30px" fill="#dcdcdc"><path d="M359.33-241.33 120-480.67 359.33-720l47.34 47.33L248-514h592v66.67H248l158.67 158.66-47.34 47.34Z" /></svg> </button>

        <div className='w-full mx-auto bg-[#011627] h-full sm:w-[70%] space-y-10'>

          <div className='flex sm:flex-row flex-col justify-center items-center'>
            {/* profile picture */}
            <div className='sm:w-1/2 w-full h-[200px] flex justify-center items-center '>
              <div className='w-[150px] h-[150px] text-[50px] font-medium font-[poppins] bg-gray-500 rounded-full flex justify-center items-center'>
                {user && user.username.charAt(0)}
              </div>
            </div>
            {/* profile name */}
            <div className='sm:w-1/2 w-full leading-none  text-white h-auto flex justify-center items-center text-[36px] font-[poppins]'>{user && user.username}</div>
          </div>

          <div className='w-full flex justify-center'>
            <button onClick={handleLogout} className='font-[montserrat] rounded-full font-medium bg-[#ffd400] px-4 py-1 text-[#011627]'>
              Logout
            </button>
          </div>

          <div className='w-full flex flex-wrap flex-col items-center sm:flex-row space-y-4'>

            <div className='w-full flex justify-center'>
              <button onClick={handleMyPosts} className='bg-[#414b53] hover:bg-[#30373d] py-3 min-w-[300px] lg:w-[50%] px-4 space-x-2 rounded-xl flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                  <FolderIcon sx={{ color: "#ffd400", fontSize: "30px" }} />
                  <h1 className='font-[montserrat] text-xl font-medium text-white'>My Posts</h1>
                </div>
                <h2 className='text-white font-[poppins] text-xl'>{userDetails && userDetails.posts.length}</h2>
              </button>
            </div>

            <div className='w-full flex justify-center'>
              <button onClick={handleLikedPosts} className='bg-[#414b53] hover:bg-[#30373d] py-3 min-w-[300px] lg:w-[50%] px-4 space-x-2 rounded-xl flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                  <FavoriteIcon sx={{ color: "#E91E63", fontSize: "30px" }} />
                  <h1 className='font-[montserrat] text-xl font-medium text-white'>Liked Posts</h1>
                </div>
                <h2 className='text-white font-[poppins] text-xl'>{userDetails && userDetails.likedPosts.length}</h2>
              </button>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Profile