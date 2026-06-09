import React from 'react'
import { useState } from 'react'

function Login() {
  const [Email,setEmail] = useState('')
  const [password,setPassword] = useState('')
   const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("LOGIN: ",Email +" "+ password)
    };

  return (
  <>
    <div className='h-screen flex items-center justify-center bg-gray-900'>

       <div className='bg-black p-8 border border-gray-700'>
        <div className='text-5xl font-extrabold tracking-widest text-center text-white py-1'>CODE ARENA</div>
        <p className='text-2xl text-red-500 font-semibold tracking-wider py-4 flex justify-center items-center'>LOGIN TO YOUR ACCOUNT</p>

        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
            <div>
             <label className='text-white'>EMAIL</label>
            <input className='w-full mt-1 px-4 py-2  bg-slate-700 text-white outline-none focus:ring-1 focus:ring-red-500'
            type='email'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}>
            </input>
            </div>

            <div className='py-3'>
            <label className='text-white'>PASSWORD</label>
            <input className='w-full mt-1 px-4 py-2  bg-slate-700 text-white outline-none focus:ring-1 focus:ring-red-500'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
            </input>
            </div>

            <button className='w-full mt-4 py-3 text-black bg-red-500 font-bold tracking-wider  hover:text-white hover:bg-red-700' type='submit'>LOGIN</button>
        </form>
       </div>
    </div>
  </>
  )
}

export default Login
