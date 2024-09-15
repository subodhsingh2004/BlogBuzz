import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function ComingSoonBox({ active, onClose }) {

    return (
        <>
            {active ?
                <div className='w-full fixed top-0 z-10 bg-opacity-70 bg-[#212121] backdrop-blur-sm h-screen flex justify-center items-center'>

                    <div className='duration-600 w-[90%] sm:w-[45%] lg:w-[30%] bg-opacity-100 backdrop-blur-md h-[30%] border border-[#ffd400] rounded-3xl bg-[#011627] flex justify-center items-center px-2'>

                        <button onClick={onClose} className='absolute top-0 right-3 text-white font-[montserrat] text-[32px]'>
                            <CloseRoundedIcon sx={{ color: "#ffd400" }} />
                        </button>

                        <h1 className='font-[poppins] text-white text-[24px] text-center'>This Feature is Coming Soon.....</h1>
                    </div>

                </div> : null
            }
        </>
    )
}

export default ComingSoonBox