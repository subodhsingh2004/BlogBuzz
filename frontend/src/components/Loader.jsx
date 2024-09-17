import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loader({ color, background = "transparent", classes, active = true }) {
  return (
    <>
      <div className={`absolute ${classes}  bg-[${background}] ${active ? "block" : "hidden"} `}>
        <CircularProgress sx={{color: "#fff94f"}} size={60} />
      </div>
    </>
  )
}

export default Loader   