import React from 'react'

function Bottom() {
  return (
    <>
        <div className='fixed px-4 flex justify-between items-center md:hidden bottom-0 z-10 w-full bg-violet-800 h-[45px]'>
            <h2 className='text-white font-[montserrat]'>Wanna write a Post ?</h2>
            <button className='bg-white px-2 rounded-full py-1 font-[poppins] text-sm'>Click Here</button>
        </div>
    </>
  )
}

export default Bottom