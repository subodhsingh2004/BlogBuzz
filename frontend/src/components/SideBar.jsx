import React, { useState } from 'react'
import PostForm from '../pages/PostForm'
import { useSelector } from 'react-redux';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { NavLink, useNavigate } from 'react-router-dom';

function SideBar() {
    const [popup, setpopup] = useState(false)
    const isLogin = useSelector((state) => state.auth.status);
    const user = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()


    const handleClick = () => {
        setpopup(true)
    }

    const handleClose = () => {
        setpopup(false)
    }
    return (
        <>
            {isLogin ?
                <>
                    {/* <button onClick={handleClick} className='hidden duration-200 border-[2px] border-blue-700 h-[40px] fixed bottom-5 cursor-pointer z-10 left-3 rounded-full w-auto px-2 bg-[#dcdcdc] md:flex justify-center items-center font-[montserrat] font-medium hover:bg-[#bdbbbb]'>Write a Post </button> */}
                    {/* <h2 className='text-white font-[montserrat]'>Wanna write a Post ?</h2>
                        <button onClick={handleClick} className='bg-[#ffd400] px-2 rounded-full py-1 font-[poppins] text-sm text-[#011627] font-bold'>Click Here</button> */}

                    <div className='fixed bottom-2 flex w-full justify-center'>
                        <div className='mx-auto flex px-4 justify-between items-center bottom-2 z-10 w-auto space-x-5 bg-[#ffd400] backdrop-blur-sm bg-opacity-50 border border-[#121212] h-[45px] rounded-full shadow-black shadow-2xl'>
                            <NavLink to={'/'} className={({ isActive }) =>
                                `transition-transform  duration-200 hover:scale-110`}>
                                {({ isActive }) => <HomeRoundedIcon sx={{ color: isActive ? "#000" : "#4a4a4a", fontSize: "30px" }} />}
                            </NavLink>

                            <button onClick={handleClick} className={
                                `transition-transform  duration-200 hover:scale-110`}>
                                <AddCircleOutlineRoundedIcon sx={{ color: popup ? "#000" : "#4a4a4a", fontSize: "30px" }} />
                            </button>
                                
                            <NavLink to={`/profile/${user.username}`} className={({ isActive }) =>
                                `transition-transform  duration-200 hover:scale-110`}>
                                {({ isActive }) => <AccountCircleRoundedIcon sx={{ color: isActive ? "#000" : "#4a4a4a", fontSize: "30px" }} />}
                            </NavLink>
                        </div>
                    </div>
                </> : null
            }

            {
                popup ? <PostForm active={true} setActive={setpopup} onClose={handleClose} /> : null
            }
        </>
    )
}

export default SideBar