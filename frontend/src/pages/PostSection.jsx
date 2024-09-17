import React, { useCallback, useEffect, useState } from 'react'
import Card from '../components/Card'
import Loader from '../components/Loader'
import SideBar from '../components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ComingSoonBox from '../components/ComingSoonBox'
import { setPosts } from '../slices/PostsSlice'

function PostSection() {

    const dispatch = useDispatch()

    const isLogin = useSelector(state => state.auth.status)
    const postFromSessionStorage = useSelector(state => state.posts.postsData)
    
    // console.log(isLogin);

    const [query, setQuery] = useState('')

    const [boxStatus, setBoxStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const [post, setPost] = useState(postFromSessionStorage)
    // const img = "/images/img1.png"


    const loadData = useCallback(async () => {
        if (isLogin && !postFromSessionStorage) {
            console.log("loaded")
            setLoading(true)
            try {
                const items = await axios.get("/api/v1/posts/all-posts")
                setPost(items.data)
                dispatch(setPosts(items.data))
                setLoading(false)

            } catch (error) {
                console.log(error.response.data)
            }
        }
    }, [isLogin])

    useEffect(() => {
        loadData();
        console.log("render");
    }, [loadData])

    const filterdItems = post.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))

    // console.log(handleSearch())

    const handleClose = () => {
        setBoxStatus(false)
    }
    return (
        <>
            <div className='mt-[48vh] absolute w-full min-h-[52vh] flex flex-col items-center  bg-[#121212] py-6 pb-20'>

                {
                    isLogin ? post.length > 0 ? <div className='w-full flex flex-col items-center'>
                        <div className='w-full flex h-[40px] justify-center'>
                            <div className='flex items-center rounded-full py-2 px-3 text-xl font-[poppins] bg-[#fafaff] placeholder:text-gray-600 font-medium w-[80%] md:w-[40%] focus:outline-none'>
                                <input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder='Search Posts' className='w-full focus:outline-none h-[38px] bg-transparent placeholder:text-gray-600' />
                                <SearchRoundedIcon sx={{ fontSize: "32px" }} />
                            </div>
                        </div>

                        <div className='w-[100%] sm:w-[55%] h-auto gap-8 pt-10'>
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