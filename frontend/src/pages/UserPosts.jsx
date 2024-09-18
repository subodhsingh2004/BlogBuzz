import Card from '../components/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function UserPosts() {
    const { pageHeading } = useParams()

    const [PostsInfo, setPostsInfo] = useState([])

    // useEffect(() => { loadInfo() }, [])

    const loadLikePostsInfo = async () => {
        try {
            const response = await axios.get('/api/v1/users/get-liked-posts')
            // console.log(response.data.likedPosts);

            setPostsInfo(response.data.likedPosts)
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    const loadMyPostsInfo = async () => {
        try {
            const response = await axios.get('/api/v1/users/get-my-posts')
            // console.log(response.data.likedPosts);

            setPostsInfo(response.data.posts)
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    let heading;
    if (pageHeading === "liked-posts") {
        heading = "Posts that you have been liked"
        loadLikePostsInfo()
    }else if(pageHeading === "my-posts"){
        heading = "My Posts"
        loadMyPostsInfo()
    } else {
        heading = "none"
    }

    return (

        <>
            <div className='w-full min-h-screen absolute mt-[8vh] bg-[#011627]'>

                <div className='w-full mx-auto bg-[#011627] h-full pt-5  space-y-10'>

                    <div className='flex w-full justify-center items-center flex-col space-y-6'>
                        <h1 className='text-center text-white font-[poppins] text-[30px]'>{heading}</h1>

                        {
                            PostsInfo.length > 0 ? <div className='w-[70%] sm:w-[40%] h-auto gap-8'>
                                {PostsInfo.map((p) => (
                                    <Card key={p._id} id={p._id} imageURL={p.postImage} title={p.title} authorName={p.author.username} createdDate={p.createdAt} likesCount={p.likes.length} />
                                ))}
                            </div>: <div><Loader color={"#ffd400"} /></div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserPosts