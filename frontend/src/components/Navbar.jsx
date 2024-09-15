import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../store/AuthSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const [isOpen, setIsOpen] = useState(false)

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
                // console.log(userDetails.data);
                dispatch(login(userDetails.data))
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    const handleClick = () => {
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

    return (
        <>
            <nav className='w-full h-[8vh] fixed z-10 bg-[#2667ff] backdrop-blur-md bg-opacity-60 flex items-center justify-between px-3 sm:px-5 border-black border-b-[1px]'>


                {
                    isLogin ? <button className='hidden sm:flex flex-col text-red-600 text-[16px] sm:text-[20px]  font-[poppins] font-medium text-left'>
                        <h4 className='text-black text-lg leading-5'>Welcome</h4>
                        <Link to={`/profile/${user.username}`}>
                            <h2 className='leading-4 text-[22px] text-[#f8f8fe]'>{user && user.username}</h2>
                        </Link>
                    </button>
                        : null
                }

                <button onClick={handleClick}><h1 className='text-[24px] sm:text-[32px] font-[poppins] font-bold text-[#ffd400]'> BlogBuzz </h1></button>

                {
                    isLogin ?
                        <div>
                            <button onClick={handleProfileClick} className='sm:hidden text-[24px] bg-[#ffd400] text-[#011627] font-medium rounded-full w-[36px] h-[36px] flex justify-center items-center text-center font-[poppins]'><h2 className='mt-[2px]'>{user && user.username.charAt(0).toUpperCase()}</h2>
                            </button>

                            {/* {
                                isOpen ?
                                    <div className='duration-200 bg-[#011627] h-[100px] w-[120px] rounded-lg absolute right-1 top-[8vh]'>

                                    </div> : null
                            } */}

                            <button onClick={handleLogout} className='hidden sm:block font-[montserrat] rounded-full font-medium bg-[#011627] px-4 py-2 text-[#f7f7f9]'>
                                Logout
                            </button>
                        </div> : <button onClick={() => navigate('/login')} className='font-[montserrat] rounded-full font-medium bg-[#011627] px-4 py-2 text-[#f7f7f9]'>
                            Login
                        </button>
                }

            </nav>
        </>
    )
}

export default Navbar