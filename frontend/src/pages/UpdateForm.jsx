import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function UpdateForm({
    active, setActive, titleText, contentText, contentUpdateFn
}) {

    const user = useSelector(state => state.auth.userData)
    let userId = user && user._id || null

    const [popup, setPopup] = useState(active)
    
    const [title, setTitle] = useState(titleText)
    const [image, setImage] = useState(null)
    const [content, setContent] = useState(contentText)

    const id = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("/api/v1/posts/updatepost",
                {title: title, content: content, postId: id.id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            if(response){
                toast.success("Updated Successfully")
                setTitle('')
                setContent('')
                contentUpdateFn()
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response)
        }

        setActive(false)
    }

    const handleClose = () => {
        setPopup(false)
        setActive(false)
    }
    return (
        <>
            {
                active ? <div className='w-full fixed top-0 bg-opacity-40 z-10  bg-[#212121] backdrop-blur-sm h-screen flex justify-center items-center'>
                    <div className='duration-600 w-[90%] max-w-[400px] bg-[#121212] h-auto pt-5 pb-8 border border-white rounded-3xl bg-[#] px-5'>

                        <div className='flex justify-between'>
                            <h2 className='text-[#d7f9ff] font-[poppins] text-[22px] md:text-[28px] lg:text-[30px] tracking-wide'>Update Post</h2>

                            <button onClick={handleClose} className='text-white font-[montserrat] text-[32px] font-bold'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="40px" fill="#C8102E"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                            </button>
                        </div>

                        <h2 className='mt-2 font-[poppins] text-white'>Currently you can only update Title and Content</h2>

                        <form onSubmit={handleSubmit} className={`flex flex-col gap-6 mt-5`}>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='text-[#3772ff] focus:outline-none font-[montserrat] px-2 py-1 text-[20px] bg-[#121212] border border-[#3772ff] rounded-md' />

                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className='rounded-md h-[150px] lg:h-[200px] bg-[#121212] border border-[#3772ff] px-2 py-1 font-[montserrat] text-white focus:outline-none hide-scrollbar' name="" id="" placeholder='Write Something here .....' style={{ resize: 'none' }}></textarea>

                            <button type='submit' className='bg-[#3772ff] py-1 rounded-md duration-500 text-white font-[poppins] text-[20px] disabled:bg-blue-300 disabled:cursor-not-allowed'>Update</button>
                        </form>

                    </div>

                </div> : null

            }
        </>
    )
}

export default UpdateForm