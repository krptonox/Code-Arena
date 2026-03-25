import { useState } from 'react'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Routes>
    //   <Route path="/" element={<Home />}></Route>
    // </Routes>
    <>
     <Home></Home>
    </>
  )
}

export default App
