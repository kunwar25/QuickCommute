
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CaptainSignup = () => {
    
    const navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
  
    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
  
  
    const { captain, setCaptain } = useContext(CaptainDataContext)
    
  
    const submitHandler = async (e) => {
      e.preventDefault()
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      }
      
      
  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
  
      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
  
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')

    }
      
    
    





     return (<div className="px-5 py-5 h-screen flex flex-col justify-between">
            <div>
            <img className='w-16 mb-10 ' src = '../images/captainlogo.jpg'></img>
            <form onSubmit={(e) => submitHandler(e)}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
            type = "email" 
            placeholder='email@example.com'
            />
    
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
    
            <input 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base" 
            type = "password" placeholder='password'/>
            <h3 className="text-lg mb-2 font-medium">Vehicle Information</h3>
            <div className="flex gap-4 mb-6">
                <input 
                    required
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-base" 
                    type="text" 
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    placeholder='Vehicle Color'
                />
                <input 
                    required
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-base" 
                    type="text" 
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder='Vehicle Plate'
                />
            </div>
            <div className="flex gap-4 mb-6">
                <select 
                    required
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-base" 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="moto">Moto</option>
                </select>
                <input 
                    required
                    className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-base" 
                    type="number" 
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    placeholder='Vehicle Capacity'
                />
            </div>
            <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base" >
                Join Fleet </button>
            <p className="text-center">Already have a account? <Link to = '/captain-login'className='text-blue-600 '>Login</Link>
            </p>
            </form>
            </div>
            <div>
                <p className="text-[10px] mt-8 leading-tight"> This site is protected by reCAPTCHA and Google's <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service apply.</span>.
                     </p>
            </div>
        </div>)

    }
export default CaptainSignup;