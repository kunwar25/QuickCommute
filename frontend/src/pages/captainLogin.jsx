import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import { useContext } from "react";


const CaptainLogin = () => {   

    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [captainData, setCaptainData] = useState({});
        const navigate = useNavigate();
        const { captain, setCaptain } = useContext(CaptainDataContext);

        const submitHandler = async (e) => {
            e.preventDefault();
            const captainData = {
                email,
                password
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
            if(response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }

            
            
            console.log(captainData);
            setEmail('');
            setPassword('');
            
        }


    return (<div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className='w-16 mb-10 ' src = '../images/captainlogo.jpg'></img>
        <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
        <h3 className="text-lg mb-2 font-medium">What's your email</h3>
        <input 
        required
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
        type = "email" 
        placeholder='email@example.com'
        />

        <h3 className="text-lg font-medium mb-2">Enter Password</h3>

        <input 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
        type = "password" placeholder='password'/>
        <button
        className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base" >
            Login</button>
        <p className="text-center">Join fleet? <Link to = '/captain-signup'className='text-blue-600 '>Register as a Captain</Link>
        </p>
        </form>
        </div>

        <div>
            <Link
                to = '/login'
                  className="flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base" >

            Sign in as User</Link>
        </div>
    </div>)
}

export default CaptainLogin;