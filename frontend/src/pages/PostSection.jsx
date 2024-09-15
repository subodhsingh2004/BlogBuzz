import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Loader from '../components/Loader'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ComingSoonBox from '../components/ComingSoonBox'

function PostSection() {
    const isLogin = useSelector(state => state.auth.status)
    // console.log(isLogin);

    const [query, setQuery] = useState('')

    const [boxStatus, setBoxStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const [post, setPost] = useState([])
    // const img = "/images/img1.png"

    useEffect(() => {
        loadData();
        // console.log(post);
    }, [isLogin])

    const loadData = async () => {
        if (isLogin) {

            setLoading(true)
            try {
                const items = await axios.get("/api/v1/posts/all-posts")
                setPost(items.data)
                setLoading(false)

            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    const filterdItems = post.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))

    // console.log(handleSearch())

    const handleClose = () => {
        setBoxStatus(false)
    }
    return (
        <>
            <div className='mt-[48vh] absolute w-full min-h-[52vh] flex flex-col items-center  bg-[#011627] py-6 pb-20'>

                {
                    isLogin ? post.length > 0 ? <div className='w-full flex flex-col items-center'>
                        <div className='w-full flex h-[40px] justify-center'>
                            <div className='flex items-center rounded-full py-2 px-3 text-xl font-[poppins] bg-[#f4db5e] placeholder:text-gray-600 font-medium w-[80%] md:w-[40%] focus:outline-none'>
                                <input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder='Search Posts' className='w-full focus:outline-none h-[38px] bg-transparent placeholder:text-gray-600' />
                                <SearchRoundedIcon sx={{fontSize: "32px"}}/>
                            </div>
                        </div>

                        <div className='w-[70%] sm:w-[90%] h-auto flex flex-wrap  justify-center items-center gap-8 pt-10'>
                            {filterdItems.length > 0 ? filterdItems.map((p) => (
                                <Card key={p._id} id={p._id} imageURL={p.postImage} title={p.title} authorName={p.author.username} createdDate={p.createdAt} likesCount={p.likes.length} />
                            )) : <h1 className='text-white text-2xl font-[poppins]'>No Posts Found</h1>}
                        </div></div> : <h1 className='font-[poppins] text-2xl text-white text-center'>No Post, be first to write a post</h1>
                        : <h1 className='font-[poppins] text-2xl text-white text-center'>Please Login to see all Posts</h1>
                }

                {/* <SideBar /> */}
                <Loader color={"#ffd400"} active={loading} />
                <ComingSoonBox active={boxStatus} onClose={handleClose} />
            </div>
        </>
    )
}

export default PostSection