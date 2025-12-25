import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const user = authService.createAccount({ name, email, password })

    // user.then(res => {
    //   if (res) {
    //     dispatch(login(res))
    //     navigate('/')
    //   }
    // })

    try {
      const user = await axios.post('/api/v1/users/signup',
        { username: name, email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        })

      if(user){
        toast.success("User registered successfully")
        navigate('/login')
      }
      
    } catch (error) {
      toast.error(error.response.data.error)
    }

  }

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <>
      <div className='bg-[#121212] w-full h-[100vh] flex justify-center'>
        <div className='rounded-xl mt-20 w-[400px] h-auto mx-auto flex flex-col justify-center items-center'>

          <div className='w-[90%] flex justify-center'>
            <h1 className='text-[30px] font-[montserrat] text-[#d7f9f7] font-bold text-center'>Signup</h1>
          </div>

          <form onSubmit={handleSubmit} className='flex items-center flex-col w-[90%] h-full mt-8'>

            <label className='text-left w-full mb-2 text-[#fafaff] font-[montserrat] font-bold'>Name</label>
            <input type="text" placeholder='Enter Your Name' className='font-[poppins] text-[18px] w-full px-2 py-2 bg-transparent text-[#fafaff] rounded-md outline outline-[#3772ff] outline-1 mb-5' value={name} onChange={e => setName(e.target.value)} />

            <label className='text-left w-full mb-2 text-[#fafaff] font-[montserrat] font-bold'>Email</label>
            <input type="text" placeholder='Enter Your Email' className='font-[poppins] text-[18px] w-full px-2 py-2 bg-transparent text-[#fafaff] rounded-md outline outline-[#3772ff] outline-1 mb-5' value={email} onChange={e => setEmail(e.target.value)} />

            <label className='text-left w-full mb-2 text-[#fafaff] font-[montserrat] font-bold'>Password</label>
            <input type="password" placeholder='Enter Your Password' className='font-[poppins] text-[18px] w-full px-2 py-2 bg-transparent text-[#fafaff] rounded-md outline outline-[#3772ff] outline-1 mb-10' value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit' className='text-[20px] font-[poppins] bg-[#3772ff] rounded-md py-1 text-white w-full'>Signup</button>

            <h2 className='mt-2 font-[montserrat] text-white'>
              Already have an account? <button onClick={handleClick} className='font-bold underline text-[#3772ff]'> Login</button>
            </h2>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup