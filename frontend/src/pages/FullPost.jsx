import React, { useCallback, useEffect, useState } from 'react'
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
import { parseISO, formatDistanceToNow } from 'date-fns';
import UpdateForm from './UpdateForm'
import { deletePost } from '../slices/PostsSlice'


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
    // console.log()(user.name);

    // get post
    const loadPost = useCallback(async () => {
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
            // console.log()(error)
        }

        // console.log()(postDetails);
    }, [])

    // get comments
    const loadComments = async () => {
        try {

            const AllComments = await axios.get(`/api/v1/posts/${id.id}/all-comments`)
            // console.log(AllComments.data.comments);

            setPostDetails((prev) => ({
                ...prev, comments: [...AllComments.data.comments]
            }))
        } catch (error) {
            // console.log(error)
        }
    }

    // Like function
    const handleLike = async () => {

        const likeStatus = !isLiked


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

            // to save changes
            if (like) {
                isLiked ? setNumberOfLikes(prev => prev -= 1) : setNumberOfLikes(prev => prev += 1)
                setIsLiked(likeStatus)
            }


        } catch (error) {
            console.log(error.response)
            toast.error("Please Login to like a Post")
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

            if (commentRes) {
                loadPost()
                toast.success(commentRes.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Please Login to add comments")
        }
        setComment('');
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
            if (res) {
                dispatch(deletePost(res.data._id))
                navigate('/')
                toast.success("Deleted Successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const dateFn = (createdDate) => {
        const date = parseISO(createdDate)
        return formatDistanceToNow(date, { addSuffix: true })
    }


    const handleShare = () => {
        // console.log(navigator)
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            }).then(() => {
                toast.info("Thanks for Sharing")
            }).catch(error);
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

                <div className='w-full min-h-screen flex flex-col md:flex-row bg-[#121212] pt-[8vh] duration-200'>

                    <div className='w-full md:w-[60%] sm:h-[92vh] overflow-y-auto hide-scrollbar flex flex-col items-center p-2 sm:py-5 sm:px-10'>

                        <div className='flex flex-col w-full space-y-4'>

                            <div className='flex justify-between w-full items-center'>
                                <h1 className='text-[24px] text-[#d7f9ff] sm:text-[26px] lg:text-[60px] font-[poppins] font-bold'>{postDetails.title}</h1>
                                <h2 className='text-[18px] md:text-[28px] lg:text-[32px] font-[poppins] font-medium text-[#3772ff]'>~ {postDetails.author.username} </h2>
                            </div>

                            <div className='w-full h-full pb-5 flex flex-col lg:flex-row md:flow-row'>
                                <div className='w-[100%] lg:w-[70%]'>
                                    <img src={postDetails.postImage} alt=""
                                        className='w-full rounded-lg' />
                                </div>

                                <div className='h-full mt-5 flex flex-row lg:flex-col flex-1 items-center justify-center space-x-2 sm:space-x-0'>
                                    <div className='flex flex-row lg:flex-col gap-4'>
                                        <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#313131] px-1 rounded-md space-y-2 py-1 duration-200 cursor-pointer'>
                                            <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                <button onClick={handleLike}>
                                                    {isLiked ? <FavoriteIcon sx={{ color: "#E91E63", fontSize: "30px" }} /> : <FavoriteBorderIcon sx={{ color: "#E91E63", fontSize: "30px" }} />}
                                                </button>
                                            </div>
                                            <h3 className='font-[poppins] text-white'>{numberOfLikes}</h3>
                                        </div>

                                        <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#313131] px-1 rounded-md space-y-2 py-1 duration-20 cursor-pointer'>
                                            <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                <button onClick={handleShare}>
                                                    <ShareIcon sx={{ color: "#32cd32", fontSize: "30px" }} />
                                                </button>
                                            </div>
                                            <h3 className='font-[Poppins] text-white'>Share</h3>
                                        </div>
                                    </div>
                                    {
                                        extraFeature ?
                                            <div className='flex lg:mt-4 flex-row lg:flex-col gap-4'>
                                                <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#313131] px-1 rounded-md space-y-0 py-1 duration-200 cursor-pointer'>
                                                    <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                        <button onClick={handleEdit}>
                                                            <EditNoteIcon sx={{ color: "#1e90ff", fontSize: "40px" }} />
                                                        </button>
                                                    </div>
                                                    <h3 className='font-[poppins] mt-0 text-white'>Edit</h3>

                                                </div>

                                                <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#313131] px-1 rounded-md space-y-2 py-1 duration-200 cursor-pointer'>
                                                    <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                        <button onClick={handleDelete}>
                                                            <DeleteIcon sx={{ color: "#C8102E", fontSize: "30px" }} />
                                                        </button>
                                                    </div>
                                                    <h3 className='font-[poppins] text-white'>Delete</h3>

                                                </div>
                                            </div> : null
                                    }
                                </div>

                            </div>

                            <div className='text-left w-full border-t-[1px] border-[#fafaff] py-2'>
                                <p className='text-[20px] font-[DM sans] text-[#fafaff]'>{postDetails.content}</p>
                            </div>


                        </div>
                    </div>

                    <div className='w-full md:w-[40%] lg:h-[90vh] flex flex-col p-2 pb-16 sm:pb-0 sm:py-5 sm:px-10'>
                        <div className='flex flex-1 flex-col space-y-5'>
                            <h2 className='text-left font-[poppins] text-[24px] font-medium text-[#d7f9ff]'>Comments</h2>

                            <form onSubmit={handleComment} className='flex w-full space-x-4 justify-between items-center'>
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment' className='flex-1 text-[#fafaf7] h-[40px] bg-transparent border focus:outline-none px-2 font-[montserrat] border-[#3772ff] rounded-md py-2' />
                                <button type='submit' className='text-white h-[40px] w-[100px] rounded bg-[#3772ff] font-[poppins] font-medium text-lg flex justify-center items-center hover:bg-blue-700'>
                                    add
                                </button>
                            </form>

                            <div className='flex w-full h-[70vh] overflow-y-auto hide-scrollbar flex-col'>
                                {
                                    postDetails.comments.length > 0 ?
                                        postDetails.comments.map(c => <div key={c._id} className='py-2 space-x-3 border-t border-gray-400 flex flex-row justify-between w-full items-center'>
                                            <div className='bg-yellow-300 w-[30px] h-[30px] rounded-full flex justify-center items-center font-bold font-[poppins]'>
                                                {c.user.username.charAt(0)}
                                            </div>
                                            <div className='flex flex-col leading-4 flex-1'>
                                                <h2 className='font-[poppins] text-white'>
                                                    {c.user.username}
                                                </h2>
                                                <p className='text-gray-400 font-[montserrat] text-sm'>
                                                    {c.text}
                                                </p>

                                            </div>
                                            <div>
                                                <h3 className='font-[montserrat] text-sm text-white'>{dateFn(c.createdAt)}</h3>
                                            </div>
                                        </div>) :
                                        <h1 className='text-[#fafaf7]'>No Comments</h1>
                                }
                            </div>
                        </div>
                    </div>


                    {/* <div className='w-100% sm:w-[60%] min-h-[92vh] px-2 md:px-10 py-5 mx-auto flex flex-col items-center space-y-5'>

                        <div className='flex justify-between w-full items-center'>
                            <h1 className='text-[24px] text-white sm:text-[26px] lg:text-[60px] font-[poppins] font-bold'>{postDetails.title}</h1>
                            <h2 className='text-[18px] md:text-[28px] lg:text-[32px] font-[poppins] font-medium text-[#2667ff]'>~ {postDetails.author.username} </h2>
                        </div>

                        <div className='w-full flex flex-col justify-between space-y-3 lg:space-y-5 items-center'>

                            <div className='w-full lg:w-[100%]'>
                                <img src={postDetails.postImage} alt=""
                                    className='w-full rounded-lg' />
                            </div>

                            <div className='w-full lg:w-1/3 flex gap-4'>

                                <div className='flex gap-4'>
                                    <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                        <div className='rounded-full w-[50px] flex justify-center items-center'>
                                            <button onClick={handleLike}>
                                                {isLiked ? <FavoriteIcon sx={{ color: "#E91E63", fontSize: "30px" }} /> : <FavoriteBorderIcon sx={{ color: "#E91E63", fontSize: "30px" }} />}
                                            </button>
                                        </div>
                                        <h3 className='font-[poppins] text-white'>{numberOfLikes}</h3>
                                    </div>

                                    <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                        <div className='rounded-full w-[50px] flex justify-center items-center'>
                                            <button onClick={handleShare}>
                                                <ShareIcon sx={{ color: "#32cd32", fontSize: "30px" }} />
                                            </button>
                                        </div>
                                        <h3 className='font-[Poppins] text-white'>Share</h3>
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
                                                <h3 className='font-[poppins] mt-0 text-white'>Edit</h3>

                                            </div>

                                            <div className='text-center flex flex-col items-center justify-center w-full hover:bg-[#ffd400] px-1 rounded-md space-y-2 py-1 duration-300 cursor-pointer'>
                                                <div className='rounded-full w-[50px] flex justify-center items-center'>
                                                    <button onClick={handleDelete}>
                                                        <DeleteIcon sx={{ color: "#C8102E", fontSize: "30px" }} />
                                                    </button>
                                                </div>
                                                <h3 className='font-[poppins] text-white'>Delete</h3>

                                            </div>
                                        </div> : null
                                }

                            </div>
                        </div>

                        <div className='text-left w-full border-t-[1px] border-b-[1px] border-[#fafaff] py-2'>
                            <p className='text-[20px] font-[DM sans] text-white'>{postDetails.content}</p>
                        </div>
                    </div> */}

                    {/* Comment Section */}
                    {/* <div className='flex flex-1 flex-col space-y-5 pb-10'>
                        <h2 className='text-left font-[poppins] text-[24px] font-medium text-[#fafaff]'>Comments</h2> */}

                    {/* Comment Form */}
                    {/* <form onSubmit={handleComment} className='flex w-full space-x-4 justify-between items-center'>
                            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment' className='flex-1 h-[40px] bg-transparent border focus:outline-none px-2 font-[montserrat] border-[#3772ff] rounded-md py-2' />
                            <button type='submit' className='text-white h-[40px] w-[100px] rounded bg-[#3772ff] font-[poppins] font-medium text-lg flex justify-center items-center hover:bg-blue-700'>
                                add
                            </button>
                        </form> */}

                    {/* All Comments */}
                    {/* <div className='flex w-full flex-col'>
                            {
                                postDetails.comments.length > 0 ?
                                    postDetails.comments.map(c => <div key={c._id} className='py-2 space-x-3 border-t border-gray-400 flex flex-row justify-between w-full items-center'>
                                        <div className='bg-yellow-300 w-[30px] h-[30px] rounded-full flex justify-center items-center font-bold font-[poppins]'>
                                            {c.user.username.charAt(0)}
                                        </div>
                                        <div className='flex flex-col leading-4 flex-1'>
                                            <h2 className='font-[poppins] text-white'>
                                                {c.user.username}
                                            </h2>
                                            <p className='text-gray-400 font-[montserrat] text-sm'>
                                                {c.text}
                                            </p>

                                        </div>
                                        <div>
                                            <h3 className='font-[montserrat] text-sm text-white'>{dateFn(c.createdAt)}</h3>
                                        </div>
                                    </div>) :
                                    <h1>No Comments</h1>
                            }
                        </div>
                    </div> */}



                </div>

                <UpdateForm active={popup} setActive={setpopup} titleText={postDetails.title} contentText={postDetails.content} contentUpdateFn={loadPost} />
            </>
        )
    } else {
        return (
            <div className='w-full min-h-screen bg-[#121212] absolute mt-[8vh] duration-200'>

                <div className='w-90% sm:w-[70%] min-h-[92vh] px-2 md:px-10 py-5 mx-auto flex justify-center items-center'>

                    <Loader color={"#011627"} />

                </div>
            </div>
        )
    }


}

export default FullPost