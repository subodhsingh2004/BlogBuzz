import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Card({ id, title, authorName, imageURL, content, createdDate, likesCount }) {

  const [url, setURL] = useState(imageURL)

  // to convert time in redable format
  const date = new Date(createdDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = date.toLocaleDateString('en-IN', options);


  return (
    <>
      <Link to={`/post/${id}`}>
        {/* <div className='bg-transparent border-1 duration-200 min-h-[200px]  sm:h-[450px] w-full p-4 cursor-pointer flex flex-col-reverse border-b justify-between space-y-0'>

          <img src={url} alt="" className='rounded w-full h-[40%] sm:h-[80%]' />

          <div className='h-auto'>

            <div className='flex justify-between h-auto items-center'>
              <h1 className='text-[20px] font-[poppins] font-bold mb-0 text-white'>{title}</h1>
              <h3 className='text-sm font-[montserrat] text-gray-200'>{readableDate}</h3>
            </div>

            <div className='flex justify-between h-auto items-center'>
              <p className='text-[14px] font-[poppins] mb-0 text-yellow-300'>~ {authorName}</p>
              <h3 className='text-sm font-[montserrat] text-white'><b className='text-yellow-300'>{likesCount}</b> Likes</h3>
            </div>

          </div>

        </div> */}

        <div className='bg-transparent border-b border-1 border-[#fafaff] h-[350px] sm:h-[550px] flex flex-col pb-10 pt-6 px-2 gap-2'>

          <div className='w-full flex justify-between items-center'>
            <h1 className='text-[32px] tracking-wide font-[poppins] font-bold mb-0 text-[#fafaff]'>{title}</h1>
            <h3 className='text-lg font-[montserrat] text-gray-200'>By : <b className='text-[#fff94f]'>{authorName}</b></h3>
          </div>

          <img src={url} alt="" className='rounded w-full h-[40%] flex-1' />

          <div className='flex justify-between h-auto items-center'>
            <h3 className='text-lg font-[montserrat] text-white'><b className='text-yellow-300'>{likesCount}</b> Likes</h3>
            <p className='text-[14px] font-[poppins] mb-0 text-[#fafaff]'>{readableDate}</p>
          </div>

        </div>

      </Link>
    </>
  )
}

// #E0F7FA – Light cyan.
// #FCE4EC – Light pink.
// #FFFFF0 – Ivory.
// #FFFDD0 – Cream.
// #E5E5E5 – Light gray.
// #DCDCDC – Gainsboro.
export default Card