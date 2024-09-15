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
        <div className='bg-[#465362] hover:translate-y-[-5px] duration-200 min-h-[200px] h-[280px] min-w-[280px] max-w-[280px] rounded-md p-4 cursor-pointer flex flex-col justify-between'>

          <img src={url} alt="" className='rounded w-full h-[70%]' />

          <div>
            <div className='flex justify-between h-auto items-center'>
              <h1 className='text-[20px] font-[poppins] font-bold mb-0 text-white'>{title}</h1>
              <h3 className='text-sm font-[montserrat] text-gray-200'>{readableDate}</h3>
            </div>

            <div className='flex justify-between h-auto items-center'>
              <p className='text-[14px] font-[poppins] mb-0 text-yellow-300'>~ {authorName}</p>
              <h3 className='text-sm font-[montserrat] text-white'><b className='text-yellow-300'>{likesCount}</b> Likes</h3>
            </div>

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