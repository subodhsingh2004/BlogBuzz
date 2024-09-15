import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function HeroSection() {
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.auth.status)

    const handleClick = () => {
        navigate('/signup')
        // toast.error('🦄 Hello :)')
    }

    return (
        <>
            <div className='absolute w-full mt-[8vh] bg-gradient2 h-[40vh] flex flex-col md:flex-row items-center justify-center'>

                <div className={`${isLogin ? "w-full" : "md:w-1/2 lg:w-2/3"} text-white w-full  h-1/2 md:h-full flex items-center text-[28px] sm:text-4[38px] md:text-[42px] lg:text-[66px] font-[poppins] font-bold justify-center md:pl-5 lg:p-10 md:tracking-[5px]`}>
                    Discover latest post
                </div>

                {
                    isLogin ? null : <div className='w-full md:w-1/2 lg:w-1/3 h-1/2 md:h-full flex flex-col items-center  md:justify-center '>
                        <div className='space-y-4 md:pl-0 flex flex-col items-center sm:items-start'>
                            <h2 className='text-[16px] lg:text-[20px] text-white font-[poppins]'>Wanna write your first post ?</h2>
                            <button onClick={handleClick} className='bg-[#011627] py-1 w-auto text-[16px] lg:text-[20px] px-3 rounded font-[montserrat] text-white'>Get Started</button>
                        </div>
                    </div>
                }
                <div className='fixed z-20 right-4 top-16'>
                    
                </div>
            </div>
        </>
    )
}

export default HeroSection