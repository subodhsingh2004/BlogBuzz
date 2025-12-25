import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../slices/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import PostForm from '../pages/PostForm';


function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const [isOpen, setIsOpen] = useState(false)
    const [popup, setpopup] = useState(false)


    // to check if user is login
    const isLogin = useSelector((state) => state.auth.status);
    const user = useSelector((state) => state.auth.userData)

    // function to check if user is login
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const userDetails = await axios.get("/api/v1/users/get-current-user")
            if (userDetails) {
                dispatch(login(userDetails.data))
            }
        } catch (error) {
            // console.log()(error.response.data)
        }
    }
    const handleLogoClick = () => {
        navigate('/')
    }

    const handleLogout = async () => {
        const res = await axios.get('/api/v1/users/logout')
        toast.success(res.data.message)
        // navigate('/')
        dispatch(logout())
    }

    const handleProfileClick = () => {
        navigate(`/profile/${user.username}`)
    }

    const handleClick = () => {
        setpopup(true)
    }

    const handleClose = () => {
        setpopup(false)
    }

    return (
        <>
            <nav className='w-full h-[8vh] fixed z-10 bg-transparent backdrop-blur-md bg-opacity-60 flex items-center justify-between  px-3 sm:px-5 shadow-sm shadow-black border-b border-b-gray-500'>

                <button onClick={handleLogoClick}><h1 className='text-[24px] sm:text-[32px] font-[poppins] font-bold text-[#fff94f] w-[10%]'> BlogBuzz </h1></button>

                <ul className='hidden md:flex w-full justify-center space-x-3 max-auto'>
                    <Link to={"/"} className='flex bg-[#313131] py-1 px-2 space-x-1 rounded-md items-center'>
                        <li><HomeRounded sx={{ color: "#d7f7f9", fontSize: "24px" }} /></li>
                        <p className='leading-3 text-white'>Home</p>
                    </Link>
                    {isLogin ? <button onClick={handleClick} className='flex bg-[#313131] px-2 py-1 space-x-1 rounded-md items-center'>
                        <li><AddCircleOutlineRounded sx={{ color: "#d7f7f9", fontSize: "24px" }} /></li>
                        <p className='leading-3 text-white'>Add Post</p>
                    </button> : null}
                </ul>

                {
                    isLogin ?
                        <div>
                            {/* <button onClick={handleProfileClick} className='sm:hidden text-[20px] bg-[#ffd400] text-[#011627] font-bold rounded-full w-[32px] h-[32px] flex justify-center items-center text-center font-[poppins]'><h2 className='mt-[2px]'>{user && user.username.charAt(0).toUpperCase()}</h2>
                            </button> */}

                            <button onClick={handleProfileClick}><AccountCircleRoundedIcon sx={{ color: "#d7f7f9", fontSize: "38px" }} /></button>
                        </div> : <button onClick={() => navigate('/login')} className='font-[montserrat] rounded-full font-medium bg-[#d7f9ff] px-4 py-1 text-black'>
                            Login
                        </button>
                }

            </nav>

            {
                popup ? <PostForm active={true} setActive={setpopup} onClose={handleClose} /> : null
            }
        </>
    )
}

export default Navbar