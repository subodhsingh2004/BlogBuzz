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

      console.log(user.data);
      
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.error)
    }

  }

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <>
      <div className='bg-[#fced4e] sm:bg-[#212121] w-full h-[100vh] flex justify-center items-center'>
        <div className='bg-[#fced4e] rounded-xl w-[400px] h-[450px] mx-auto p-4 flex flex-col justify-center items-center'>

          <div className='w-[90%] flex '>
            <h1 className='text-[30px]  font-[montserrat] font-bold text-center'>Signup</h1>
          </div>

          <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col w-[90%] h-full'>

            <label className='text-left w-full mb-1 text-[#ea2b1f] font-[montserrat] font-bold'>Name</label>
            <input type="text" placeholder='Enter Your Name' className='font-[poppins] text-[18px] w-full px-2 py-1 outline outline-1 mb-5' value={name} onChange={e => setName(e.target.value)} />

            <label className='text-left w-full mb-1 text-[#ea2b1f] font-[montserrat] font-bold'>Email</label>
            <input type="text" placeholder='Enter Your Email' className='font-[poppins] text-[18px] w-full px-2 py-1 outline outline-1 mb-5' value={email} onChange={e => setEmail(e.target.value)} />

            <label className='text-left w-full mb-1 text-[#ea2b1f] font-[montserrat] font-bold'>Password</label>
            <input type="password" placeholder='Enter Your Password' className='font-[poppins] text-[18px] w-full px-2 py-1 outline outline-1 mb-10' value={password} onChange={e => setPassword(e.target.value)} />

            <button type='submit' className='text-[20px] font-[poppins] bg-blue-600 py-1 text-white w-full'>Signup</button>

            <h2 className='mt-2 font-[montserrat]'>
              Already have an account? <button onClick={handleClick} className='font-bold underline text-[#ea2b1f]'> Login</button>
            </h2>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup