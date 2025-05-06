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
                    <div className='sm:hidden fixed bottom-0 h-[55px] bg-[#fafaf7] border-t border-t-[#fff94f] backdrop-blur-md bg-opacity-5 flex w-full justify-center items-center rounded-t-3xl'>
                        <div className='mx-auto flex px-4 justify-evenly items-center bottom-2 z-10 w-full space-x-5  h-[45px] rounded-full '>
                            <NavLink to={'/'}>
                                {({ isActive }) => <div className='flex flex-col items-center'> <HomeRoundedIcon sx={{ color: isActive ? "#fff94f" : "#fafaf7", fontSize: "30px" }} /> <p className={`font-[poppins] leading-3 pt-1 ${isActive ? "text-[#fff94f]" : "text-[#fafaf7]"}`}>Home</p> </div>}
                            </NavLink>

                            <button onClick={handleClick}>
                                <div className='flex flex-col items-center'> <AddCircleOutlineRoundedIcon sx={{ color: popup ? "#000" : "#fafaf7", fontSize: "30px" }} /> <p className='font-[poppins] leading-3 pt-1 text-[#fafaf7] text-sm'>Add Post</p> </div>
                            </button>

                            <NavLink to={`/profile/${user.username}`}>
                                {({ isActive }) => <div className='flex flex-col items-center'> <AccountCircleRoundedIcon sx={{ color: isActive ? "#fff94f" : "#fafaf7", fontSize: "30px" }} /> <p className={`font-[poppins] leading-3 pt-1 ${isActive ? "text-[#fff94f]" : "text-gray-400"}`}>Profile </p> </div>}
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