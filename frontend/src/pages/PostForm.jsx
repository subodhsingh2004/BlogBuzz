import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { addPosts } from '../slices/PostsSlice'

function PostForm({
    active, setActive, onClose, Submit,
}) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.userData)
    let userId = user && user._id || null

    const [loader, setLoader] = useState(false)

    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const [content, setContent] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoader(true)

        const formData = new FormData();
        formData.append("title", title)
        formData.append("content", content)
        formData.append("author", userId)
        formData.append('file', image);



        try {
            const post = await axios.post(
                "/api/v1/posts/createpost",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            toast.success("post created successfully")
            setLoader(false)
            setActive(false)
            dispatch(addPosts(post.data))

        } catch (error) {
            toast.error(error)
        }

    }

    const handleFile = (e) => {
        setImage(e.target.files[0])
        setButtonDisabled(false)

    }
    return (
        <>
            {
                active ? <div className='w-full fixed top-0 z-10 bg-opacity-40 bg-[#212121] backdrop-blur-sm h-screen flex justify-center items-center'>
                    <div className='duration-600 w-[90%] max-w-[400px] backdrop-blur-md h-[80%] sm:h-[80%] border border-white rounded-3xl bg-[#121212] px-5'>

                        <div className='py-2 flex justify-between items-center '>
                            <h2 className='text-[#d7f9ff] font-[poppins] text-[22px] md:text-[28px] lg:text-[32px] tracking-wide'>Write a Post</h2>

                            <button onClick={onClose} className='text-white font-[montserrat] text-[32px] font-bold'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#C8102E"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={`flex flex-col gap-6 mt-8`}>
                            <input type="text"  onChange={(e) => setTitle(e.target.value)} placeholder='Title' required className='text-[#3772ff] focus:outline-none font-[montserrat] px-2 py-1 text-[20px] bg-[#121212] border border-[#3772ff] rounded-md' />

                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className='rounded-md h-[150px] lg:h-[200px] bg-[#121212] border border-[#3772ff] px-2 py-1 font-[montserrat] text-white focus:outline-none' name="" id="" required placeholder='Write Something here .....' style={{ resize: 'none' }}></textarea>

                            <div className='space-y-2'>
                                <label className='text-[#d7f9ff] font-[montserrat] text-[16px] leading-0'>* Upload an image to attract more readers</label>

                                <input type="file" onChange={handleFile} name="" id="" className='text-white font-[poppins]' />
                            </div>

                            <button type='submit' disabled={buttonDisabled} className='bg-[#3772ff] py-1 rounded-md duration-500 text-white font-[poppins] text-[20px] disabled:bg-blue-300 disabled:cursor-not-allowed'>Post</button>
                        </form>

                    </div>

                    <Loader color={"#ffd400"} active={loader} />

                </div> : null

            }
        </>
    )
}

export default PostForm