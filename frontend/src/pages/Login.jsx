import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/AuthSlice'
import Loader from '../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoader(true);

        try {
            const user = await axios.post(
                '/api/v1/users/login',
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            console.log(user.data);

            if (user) {
                setLoader(false)
                dispatch(login(user.data))
                toast.success("Login Successfully")
                // navigate('/')
            }
            
        } catch (error) {
            setLoader(false)
            console.log(error.response.data)
            toast.error(error.response.data.error)
        }
    }

    const handleClick = () => {
        navigate('/signup')
    }


    return (
        <>
            <div className='bg-[#fced4e] sm:bg-[#212121] w-full h-[100vh] flex justify-center items-center'>
                <div className='bg-[#fced4e] rounded-xl w-[400px] h-[450px] mx-auto p-4 flex flex-col justify-center items-center'>

                    <div className='w-[90%] flex '>
                        <h1 className='text-[30px]  font-[montserrat] font-bold text-center'>Login</h1>
                    </div>

                    {/* <h3 className='text-[#ea2b1f] font-[poppins]'>{error}</h3> */}

                    <form onSubmit={handleSubmit} className='flex items-center flex-col w-[90%] h-full mt-5'>

                        <label className='text-left w-full mb-1 text-[#ea2b1f] font-[montserrat] font-bold'>Email</label>
                        <input type="text" placeholder='Enter Your Email' className='font-[poppins] text-[18px] w-full px-2 py-1 outline outline-1 mb-5' value={email} onChange={e => setEmail(e.target.value)} />

                        <label className='text-left w-full mb-1 text-[#ea2b1f] font-[montserrat] font-bold'>Password</label>
                        <input type="password" placeholder='Enter Your Password' className='font-[poppins] text-[18px] w-full px-2 py-1 outline outline-1 mb-10' value={password} onChange={e => setPassword(e.target.value)} />

                        <button type='submit' className='text-[20px] font-[poppins] bg-blue-600 py-1 text-white w-full'>Login</button>

                        <h2 className='mt-2 font-[montserrat]'>
                            Don't have an account? <button onClick={handleClick} className='font-bold underline text-[#ea2b1f]'> Signup</button>
                        </h2>
                    </form>

                    <Loader active={loader} color={"#ffd400"} background={"#212121"} classes={"h-screen w-full flex justify-center items-center bg-opacity-60 backdrop-blur-0"} />
                </div>
            </div>
        </>
    )
}

export default Login