import React from 'react'
import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function Home() {
  const [LoginPage,setLoginPage] = useState(true)
   const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("LOGIN: ",Email +" "+ password)
    };
  return (
    <>
    <div className='w-full h-screen bg-linear-to-r from-gray-900 via-gray-800 to-gray-900'>
       <div className='flex flex-row w-full h-screen'>
        {/* Screen div  */}
        
      <div className='w-1/2 max-h-screen bg-black text-white flex flex-col justify-start gap-8 z-2 p-[5%]'>
        {/* for left side of the screen */}
        <div>
          <h1 className="text-9xl font-extrabold tracking-widest py-2  text-white  [text-shadow:4px_4px_8px_red]">
                  CODE ARENA
          </h1>
          <h2 className="text-3xl text-red-500 font-semibold tracking-wider">
                 ENTER THE ARENA
          </h2>
        </div>

        <div>
          <p className="text-gray-600 max-w-md">
                  A competitive coding battlefield where developers
                  fight problems, climb ranks, and sharpen skills.
                </p>
        </div>

        <div className='flex gap-4 pt-6 '>
          <button className='px-8 py-3 bg-red-600 text-black font-bold tracking-widset hover:bg-red-700 transitions'onClick={() => setLoginPage(false)}>
            SIGNUP
          </button>

          <button className='px-8 py-3 border border-red-600 text-red-500 font-bold tracking-widest hover:bg-red-600 hover:text-black transition' onClick={() => setLoginPage(true)}>
            LOGIN
          </button>
        </div>
      </div>
      <div className='w-4 bg-white z-10 shadow-[0_0_18px_rgba(255,255,255,0.95),0_0_34px_rgba(255,255,255,0.65)]'>
        {/* for the white tilted line in center */}
      </div>
      <div className='w-4 bg-red-500 z-10 shadow-[0_0_20px_rgba(239,68,68,0.95),0_0_40px_rgba(239,68,68,0.7)]'>
        {/* for the red tilted line in center */}
      </div>


      <div className='w-1/2 max-h-screen bg-gray-900 text-white flex flex-col justify-center'>
        {/* for right side of the screen */}
           <div>
         {/* Login  and signup page */}
          {LoginPage ? <Login></Login> : <Signup></Signup>}
       </div>
      </div>
      
    </div>

    </div>
   
    </>
  )
}

export default Home
