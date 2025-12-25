import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../slices/AuthSlice'
import Loader from '../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

            if (user) {
                setLoader(false)
                dispatch(login(user.data))
                toast.success("Login Successfully")
                // navigate('/')
            }
            
        } catch (error) {
            setLoader(false)
            toast.error(error.response.data.error)
        }
    }

    const handleClick = () => {
        navigate('/signup')
    }


    return (
        <>
            <div className='bg-[#121212] w-full h-[100vh] flex justify-center'>
                <div className='rounded-xl mt-20 w-[400px] h-auto mx-auto flex flex-col justify-center items-center'>

                    <div className='w-[90%] flex justify-center'>
                        <h1 className='text-[30px] text-[#d7f9f7] font-[montserrat] font-bold text-center'>Login</h1>
                    </div>

                    {/* <h3 className='text-[#ea2b1f] font-[poppins]'>{error}</h3> */}

                    <form onSubmit={handleSubmit} className='flex items-center flex-col w-[90%] h-full mt-8'>

                        <label className='text-left w-full mb-2 text-[#fafaff] font-[montserrat] font-bold'>Email</label>
                        <input type="text" placeholder='Enter Your Email' className='font-[poppins] text-[18px] w-full px-2 py-2 rounded-md bg-transparent text-[#fafaff] outline outline-[#3772ff] outline-1 mb-5' value={email} onChange={e => setEmail(e.target.value)} />

                        <label className='text-left w-full mb-2 text-[#fafaff] font-[montserrat] font-bold'>Password</label>
                        <input type="password" placeholder='Enter Your Password' className='font-[poppins] text-[18px] w-full px-2 py-2 rounded-md bg-transparent text-[#fafaff] outline  outline-[#3772ff] outline-1' value={password} onChange={e => setPassword(e.target.value)} />

                        <h3 className='mb-10 mt-1 w-full text-right text-[#d7f7f9]'>Forgot Password ?</h3>

                        <button type='submit' className='text-[20px] font-[poppins] bg-[#3772ff] hover:bg-[#255cde] rounded-md py-1 text-white w-full'>Login</button>

                        <h2 className='mt-2 font-[montserrat] text-[#fafaff]'>
                            Don't have an account? <button onClick={handleClick} className='font-bold underline text-[#3772ff]'> Signup</button>
                        </h2>
                    </form>

                    <Loader active={loader} color={"#ffd400"} background={"#212121"} classes={"h-screen w-full flex justify-center items-center bg-opacity-60 backdrop-blur-0"} />
                </div>
            </div>
        </>
    )
}

export default Login