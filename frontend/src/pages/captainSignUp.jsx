
import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[vehichletype, setVehichletype] = useState('')
    const[vehicleplate, setVehicleplate] = useState('')
    const[vehicleCapacity, setVehicleCapacity] = useState('')
    const[userData,setuserData] = useState({})



    
    
    
    const submitHandler = (e) => {
        e.preventDefault()
        setuserData({
            fullname:{
                firstName,
                lastName
            },
            email,
            password,

        })
    }
    
    
    





     return (<div className="px-5 py-5 h-screen flex flex-col justify-between">
            <div>
            <img className='w-16 mb-10 ' src = '../images/captainlogo.jpg'></img>
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
            placeholder='Last name' 
            />
            </div>
    
            <h3 className="text-lg mb-2 font-medium">What's your email</h3>
            <input 
            required
           
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
            type = "email" 
            placeholder='email@example.com'
            />
    
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
    
            <input 
            required 
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
            type = "password" placeholder='password'/>
            <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base" >
                Login</button>
            <p className="text-center">Already have a account? <Link to = '/captain-login'className='text-blue-600 '>Login</Link>
            </p>
            </form>
            </div>
            <div>
                <p className="text-[10px] leading-tight"> This site is protected by reCAPTCHA and Google's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>.
                     </p>
            </div>
        </div>)

    }
export default CaptainSignup;