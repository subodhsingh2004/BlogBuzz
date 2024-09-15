import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Top from '../components/Top'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { toast } from 'react-toastify'
import {parseISO, formatDistanceToNow} from 'date-fns';
import UpdateForm from './UpdateForm'


function FullPost() {

    <Top />

    const id = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [postDetails, setPostDetails] = useState({})
    const [extraFeature, setExtraFeature] = useState(false)
    const [url, setURL] = useState('')

    const [isLiked, setIsLiked] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(0)

    const [comment, setComment] = useState('')
    const [commentDetails, setCommentDetails] = useState([])

    const [boxStatus, setBoxStatus] = useState(false)

    const [popup, setpopup] = useState(false)
    
    const handleClose = () => {
        setpopup(false)
    }

    // logged in user details
    const user = useSelector((state => state.auth.userData))
    // console.log(user.name);

    // get post
    const loadPost = async () => {
        try {

            const post = await axios.get(`/api/v1/posts/${id.id}`)

            setPostDetails(post.data)
            // setCommentDetails(post.data.comments)
            setNumberOfLikes(post.data.likes.length)

            if (post.data.author.username == user.username) {
                setExtraFeature(true)
            }

            if (post.data.likes.includes(user._id)) setIsLiked(true)
        } catch (error) {
            console.log(error)
        }

        // console.log(postDetails);
    }

    // get comments
    const loadComments = async () => {
        try {

            const AllComments = await axios.get(`/api/v1/posts/${id.id}/all-comments`)
            console.log(AllComments.data.comments);

            setPostDetails((prev) => ({
                ...prev, comments: [...AllComments.data.comments]
            }))
        } catch (error) {
            console.log(error)
        }
    }

    // Like function
    const handleLike = async () => {

        const likeStatus = !isLiked
        setIsLiked(likeStatus)

        try {

            const like = await axios.post(
                "/api/v1/posts/like",
                { userId: user._id, postId: postDetails._id, like: likeStatus },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            setNumberOfLikes(like.data.length)
            // to save changes
            

        } catch (error) {
            console.log(error.response)
        }
    }

    // Comment function
    const handleComment = async (e) => {

        e.preventDefault()

        try {
            const commentRes = await axios.post(
                "/api/v1/posts/add-comment",
                { commentText: comment, userId: user._id, postId: postDetails._id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            if (commentRes.statusText === "OK") {
                loadComments()
                setComment('');
                toast.success(commentRes.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    // Delete Post function
    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `/api/v1/posts/${id.id}/delete-post`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(res)
            if (res) {
                navigate('/')
                toast.success("Deleted Successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Date Function
    // const dateFn = (createdDate) => {
    //     const date = new Date(createdDate)
    //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //     const readableDate = date.toLocaleDateString('en-IN', options);
    //     return readableDate
    // }

    const dateFn = (createdDate) => {
        const date = parseISO(createdDate)
        return formatDistanceToNow(date, { addSuffix: true })
        format
    }

    // const handleClose = () => {
    //     setBoxStatus(false)
    // }

    const handleBoxClick = () => {
        setBoxStatus(prev => !prev)
    }

    const handleShare = () => {
        // console.log(navigator)
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            }).then(() => {
                toast.info("Thanks for Sharing")
            }).catch(console.error);
        }
    }

    const handleEdit = () => {
        setpopup(true)
    }

    useEffect(() => {
        loadPost()
    }, [])


    if (JSON.stringify(postDetails) !== '{}') {
        return (
            <>

                <div className='w-full min-h-screen bg-[#011627] absolute pt-[8vh] duration-200'>

                    <button onClick={() => (navigate('/'))} className='hidden fixed text-3xl ml-5 mt-5 bg-[#2667ff] rounded-full w-[40px] h-[40px] md:flex justify-center'> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="M359.33-241.33 120-480.67 359.33-720l47.34 47.33L248-514h592v66.67H248l158.67 158.66-47.34 47.34Z" /></svg> </button>

                    <div className='w-100% sm:w-[70%] min-h-[92vh] px-2 md:px-10 py-5 bg-[#f5f8de] mx-auto flex flex-col items-center space-y-5'>

                        <div className='flex justify-between w-full items-center'>
                            <h1 className='text-[24px] sm:text-[26px] lg:text-[60px] font-[poppins] font-bold'>{postDetails.title}</h1>
                            <h2 className='text-[18px] md:text-[28px] lg:text-[32px] font-[poppins] font-medium text-[#2667ff]'>~ {postDetails.author.username} </h2>
                        </div>

                        <div className='w-full flex flex-col justify-between space-y-3 lg:space-y-0 items-center lg:flex-row'>

                            <div className='w-full lg:w-[60%]'>
                                <img src={postDetails.postImage} alt=""
                                    className='w-full rounded-lg' />
                            </div>

                            <div className='w-full lg:w-1/3 flex  lg:flex-col justify-start lg:justify-center items-center gap-4'>

                                <div className='flex gap-4'>
                                    <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                        <div className='rounded-full w-[50px] flex justify-center items-center'>
                                            <button onClick={handleLike}>
                                                {isLiked ? <FavoriteIcon sx={{ color: "#E91E63", fontSize: "30px" }} /> : <FavoriteBorderIcon sx={{ color: "#E91E63", fontSize: "30px" }} />}
                                            </button>
                                        </div>
                                        <h3 className='font-[poppins]'>{numberOfLikes}</h3>
                                    </div>

                                    <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                        <div className='rounded-full w-[50px] flex justify-center items-center'>
                                            <button onClick={handleShare}>
                                                <ShareIcon sx={{ color: "#32cd32", fontSize: "30px" }} />
                                            </button>
                                        </div>
                                        <h3 className='font-[Poppins]'>Share</h3>
                                    </div>
                                </div>
                                {
                                    extraFeature ?
                                        <div className='flex gap-4'>
                                            <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-0 py-1 duration-300 cursor-pointer'>
                                                <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                    <button onClick={handleEdit}>
                                                        <EditNoteIcon sx={{ color: "#1e90ff", fontSize: "40px" }} />
                                                    </button>
                                                </div>
                                                <h3 className='font-[poppins] mt-0'>Edit</h3>

                                            </div>

                                            <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                                <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                    <button onClick={handleDelete}>
                                                        <DeleteIcon sx={{ color: "#C8102E", fontSize: "30px" }} />
                                                    </button>
                                                </div>
                                                <h3 className='font-[poppins]'>Delete</h3>

                                            </div>
                                        </div> : null
                                }

                            </div>
                        </div>

                        <div className='text-left w-full border-t-[1px] border-b-[1px] border-[#011627] py-2'>
                            <p className='text-[20px] font-[DM sans]'>{postDetails.content}</p>
                        </div>


                        {/* Comment Section */}
                        <div className='flex w-full flex-col space-y-2'>
                            <h2 className='text-left font-[poppins] text-[24px] font-medium text-[#011627]'>Comments</h2>

                            {/* Comment Form */}
                            <form onSubmit={handleComment} className='flex w-full space-x-4 justify-between items-center'>
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment' className='flex-1 h-[40px] bg-transparent border focus:outline-none px-2 font-[montserrat] border-blue-600 rounded-md py-1' />
                                <button type='submit' className='text-white h-[40px] w-[100px] rounded bg-blue-600 font-[poppins] font-medium text-sm flex justify-center items-center hover:bg-blue-700'>
                                    add
                                </button>
                            </form>

                            {/* All Comments */}
                            <div className='flex w-full flex-col'>
                                {
                                    postDetails.comments.length > 0 ?
                                        postDetails.comments.map(c => <div key={c._id} className='py-2 space-x-3 border-t border-gray-400 flex flex-row justify-between w-full items-center'>
                                            <div className='bg-yellow-300 w-[30px] h-[30px] rounded-full flex justify-center items-center font-bold font-[poppins]'>
                                                {c.user.username.charAt(0)}
                                            </div>
                                            <div className='flex flex-col leading-4 flex-1'>
                                                <h2 className='font-[poppins]'>
                                                    {c.user.username}
                                                </h2>
                                                <p className='text-gray-500 font-[montserrat] text-sm'>
                                                    {c.text}
                                                </p>

                                            </div>
                                            <div>
                                                <h3 className='font-[montserrat] text-sm'>{dateFn(c.createdAt)}</h3>
                                            </div>
                                        </div>) :
                                        <h1>No Comments</h1>
                                }
                            </div>
                        </div>

                    </div>

                </div>
                
                <UpdateForm active={popup} setActive={setpopup} titleText={postDetails.title} contentText={postDetails.content} contentUpdateFn={loadPost}/>
            </>
        )
    } else {
        return (
            <div className='w-full min-h-screen bg-[#011627] absolute mt-[8vh] duration-200'>

                <button onClick={() => (navigate('/'))} className='hidden fixed text-3xl ml-5 mt-5 bg-[#2667ff] rounded-full w-[40px] h-[40px] sm:flex justify-center'> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="30px" fill="#dcdcdc"><path d="M359.33-241.33 120-480.67 359.33-720l47.34 47.33L248-514h592v66.67H248l158.67 158.66-47.34 47.34Z" /></svg> </button>

                <div className='w-90% sm:w-[70%] min-h-[92vh] px-2 md:px-10 py-5 bg-[#f5f8de] mx-auto flex justify-center items-center'>

                    <Loader color={"#011627"} />

                </div>
            </div>
        )
    }


}

export default FullPost