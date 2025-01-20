import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopUp = (props) => { 
    const[otp, setOtp] = useState('');  
    const navigate = useNavigate(); 
    
    const submitHandler = async(e) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
           params: { rideId:props.ride._id,
            otp:otp},
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        },
    )
    if(response.status === 200){
        props.setRidePopUpPanel(false);
        props.setConfirmRidePopUpPanel(false);
        navigate('/captain-riding');
    }
    }   
    return(
        <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
            props.setRidePopUpPanel(false);
     }}><i class="ri-arrow-down-wide-fill text-2xl font-semibold text-gray-400"></i></h5>

     <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start?  </h3>
     <div className="flex items-center justify-between bg-yellow-400 rounded-lg p-3 mt-4">
        <div className="flex items-center gap-3">
            <img className="h-12 w-10 rounded-full object-cover" src="../images/user.jpg" alt="" />
            <h2 className="text-lg font-medium capitalize ">
                {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
            </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
     </div>
    <div className="flex gap-2 flex-col justify-between items-center">
   
    <div className="w-full mt-5">

     <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200 ">
       <i className = " text-lg ri-map-pin-2-fill"></i>
       <div>
           <h3 className="text-lg font-medium">562/11-A </h3>
           <p className="text-sm -mt-1 text-gray-600">{props.ride?.source}</p>
       </div>
     </div>
     <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200 ">
     <i className = " text-lg ri-map-pin-user-fill"></i>
       <div>
           <h3 className="text-lg font-medium">562/11-A </h3>
           <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
       </div>
     </div>
     <div className="flex items-center gap-5 p-3 ">
     <i className="ri-money-rupee-circle-line"></i>
       <div>
           <h3 className="text-lg font-medium">₹{props.ride?.fare} </h3>
           <p className="text-sm -mt-1 text-gray-600">Cash </p>
       </div>

     </div>
    </div>

     

    <div className="mt-6 w-full">
    <form onSubmit={submitHandler}>
        <input  value = {otp} onChange={(e)=>setOtp(e.target.value)} className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full"
              type="text" placeholder="Enter OTP" />

<button  
    
    className=" text-lg mt-5 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">Confirm </button>

<button 
    onClick={()=>{
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
    }}
    className="mt-3 w-full bg-red-700 text-white font-semibold p-3 rounded-lg">Cancel </button>
    </form>
    </div>
    
    </div>
   </div>

    )

}

export default ConfirmRidePopUp;