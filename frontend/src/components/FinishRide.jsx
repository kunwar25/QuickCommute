import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
    const navigate = useNavigate();
    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId:props.ride._id,
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status === 200){
           
            navigate('/captain-home');
        }

    }
    return(
        <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
            props.setFinishRidePanel(false);
     }}><i class="ri-arrow-down-wide-fill text-2xl font-semibold text-gray-400"></i></h5>

     <h3 className="text-2xl font-semibold mb-5">Finish Ride ?  </h3>
     <div className="flex items-center justify-between border-2 border-yellow-400 rounded-lg p-4 mt-4 ">
        <div className="flex items-center gap-3">
            <img className="h-12 w-10 rounded-full object-cover" src="../images/user.jpg" alt="" />
            <h2 className="text-lg font-medium">
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
           <h3 className="text-lg font-medium">₹{props.ride.fare} </h3>
           <p className="text-sm -mt-1 text-gray-600">Cash </p>
       </div>

     </div>
    </div>

     

    <div className="mt-6 w-full">
       
<button 
onClick={endRide}  
    
    className=" text-lg mt-5 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">Finish Ride </button>

     <p className=" mt-10 text-xm">*Click on finish if you completed the payment </p>
   
    </div>
    
    </div>
   </div>
    )

}

export default FinishRide;