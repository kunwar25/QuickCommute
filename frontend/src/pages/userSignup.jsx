import { set } from "mongoose";
import React, { useState,useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {UserDataContext}  from "../context/userContext";
const UserSignup = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[userData,setuserData] = useState({})



    const navigate = useNavigate()

    const {user,setUser} = useContext(UserDataContext)




    
     const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }
    





    return (<div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className='w-16 mb-10 ' src = '../images/quickcommutelogo.jpg'></img>
        <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
        <h3 className="text-lg mb-2 font-medium">What's your name? </h3>
        <div className="flex gap-4 mb-6">
        
        <input 
        required
       
        className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-base placeholder:text-base" 
        type = "text" 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='First name'
        />
         <input 
        required
       
        className="bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-base placeholder:text-base" 
        type = "text" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Last name' 
        />
        </div>

        <h3 className="text-lg mb-2 font-medium">What's your email</h3>
        <input 
        required
       
        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
        type = "email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email@example.com'
        />

        <h3 className="text-lg font-medium mb-2">Enter Password</h3>

        <input 
        required 
        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type = "password" placeholder='password'/>
        <button
        className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base" >
            Create Account</button>
        <p className="text-center">Already have a account? <Link to = '/login'className='text-blue-600 '>Login here</Link>
        </p>
        </form>
        </div>
        <div>
            <p className="text-[10px] leading-tight"> This site is protected by reCAPTCHA and Google's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>.
                 </p>
        </div>
    </div>)

    }
export default UserSignup;