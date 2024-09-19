import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDistanceToNow, parseISO } from 'date-fns';


function Card({ id, title, authorName, imageURL, content, createdDate, likesCount }) {

  const [url, setURL] = useState(imageURL)

  // to convert time in redable format
  const date = new Date(createdDate)
  const options = { month: 'short', day: 'numeric' };
  const readableDate = date.toLocaleDateString('en-IN', options);

  const dateFn = (createdDate) => {
    const date = parseISO(createdDate)
    return formatDistanceToNow(date, { addSuffix: true })
}

  return (
    <>
      <Link to={`/post/${id}`}>
    
        <div className='bg-[#212121] rounded-md hover:bg-[#313131] h-[220px] w-[300px] flex flex-col px-4 pb-2 gap-2'>

          <div className='w-full flex justify-between items-center'>
            <h1 className='text-[24px] tracking-wide flex-1 font-[poppins] font-bold mb-0 text-[#fff94f]'>{title}</h1>
            <p className='text-[14px] font-[poppins] mb-0 text-[#fafaff]'>{dateFn(createdDate)}</p>
          </div>

          <img src={url} alt="" className='rounded w-full h-[40%] flex-1' />

          <div className='flex justify-between h-auto items-center'>
            <div className='flex items-center space-x-1'>
              <FavoriteIcon sx={{fontSize: "18px", color: "#fafaf7"}} />
              <h3 className='text-[#fafaf7]'>{likesCount}</h3>
            </div>``
            <h3 className='text-md font-[montserrat] text-gray-200'>~ <b className='text-[#fff94f] font-normal'>{authorName}</b></h3>
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