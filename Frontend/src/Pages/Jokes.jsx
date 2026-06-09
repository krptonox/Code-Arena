import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
// axios is a promise-based HTTP client for the browser and Node.js. It provides an easy-to-use API for making HTTP requests and handling responses. In this code, we are using axios to make a GET request to the '/api/jokes' endpoint of our backend server to fetch the jokes data and then we are storing that data in the jokes state variable using the setJokes function.

function Jokes() {
    const [jokes, setJokes] = useState([])
    
    useEffect(() =>{
      axios.get('/api/jokes')
      .then((response)=>{
        setJokes(response.data)
      })
      .catch((error)=>{
        console.error('Error fetching jokes:', error)
      })
    },[])

  return (
    <>
    <div className='w-full min-h-screen bg-linear-to-r from-gray-900 via-gray-800 to-gray-900'>
      <div className='flex flex-col md:flex-row w-full min-h-screen'>
        <div className='w-full md:w-1/2 bg-black text-white flex flex-col justify-start gap-8 px-8 py-12 md:p-[5%]'>
          <div>
            <h1 className='text-6xl md:text-8xl font-extrabold tracking-widest leading-none'>
              JOKE
              <br />
              ARENA
            </h1>
            <h2 className='text-2xl md:text-3xl text-red-500 font-semibold tracking-wider mt-4'>
              LAUGH BETWEEN BATTLES
            </h2>
          </div>

          <p className='text-gray-400 max-w-xl text-base md:text-lg'>
            Quick coding jokes for fighters in the arena. Reload your brain, roast your bugs,
            then get back to the leaderboard.
          </p>

          <div className='inline-flex items-center gap-3 w-fit px-5 py-3 border border-red-600 text-red-400 font-semibold tracking-widest'>
            <span className='text-white'>TOTAL JOKES</span>
            <span className='text-red-500'>{jokes.length}</span>
          </div>
        </div>

        <div className='hidden md:block w-4 bg-white'></div>
        <div className='hidden md:block w-4 bg-red-600'></div>

        <div className='w-full md:w-1/2 bg-gray-900 text-white px-6 py-10 md:p-10 lg:p-12'>
          <div className='max-w-3xl mx-auto space-y-4'>
            {jokes.map((joke) => (
              <div
                key={joke.id}
                className='border border-gray-700 bg-black/50 hover:border-red-600 transition p-5 md:p-6'
              >
                <h3 className='text-xl md:text-2xl font-bold tracking-wide text-red-500'>
                  {joke.title}
                </h3>
                <p className='text-gray-300 mt-3 leading-relaxed'>
                  {joke.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Jokes
