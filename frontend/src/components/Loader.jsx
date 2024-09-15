import React from 'react'

function Loader({color, background="transparent", classes, active=true}) {
  return (
    <>
        <div className={`absolute ${classes}  bg-[${background}] ${active ? "block" : "hidden"} `}>
            <div className={`border-4 border-t-transparent border-[${color}] animate-spin rounded-full w-[60px] h-[60px]`}></div>
        </div>
    </>
  )
}

export default Loader   