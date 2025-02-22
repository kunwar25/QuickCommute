import React from "react";
import { Link,useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Riding = () => { 
    const location = useLocation();
    const { ride } = location.state || {};
    const{socket} = useContext(SocketContext);
    const navigate = useNavigate();


    socket.on('ride-ended',()=>{
        navigate('/home')
    })
    return (
        <div className="h-screen">

            <Link to='/home'className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full ">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2">
            
           <LiveTracking className="h-screen w-screen object-cover z-[-1]"/>
            </div>

            <div className="h-1/2 p-4">
            <div className="flex items-center justify-between">
        <img className="h-12" src="../images/car.png" alt="" />
        <div className="text-right">
        <h2 className="text-lg font-medium ">
            {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}  
        </h2>
        <h4 className="text-xl font-semibold -mt-1 -mb-1">
           {ride?.captain.vehicle.plate}
        </h4>
        <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
     </div>
     </div>
     
    <div className="flex gap-2 flex-col justify-between items-center">
    <div className="w-full mt-5">

     <div className="flex-items-center gap-5 p-3 border-b-2 border-gray-200 ">
     <i className = " text-lg ri-map-pin-user-fill"></i>
       <div>
           <h3 className="text-lg font-medium">562/11-A </h3>
           <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
       </div>
     </div>
     <div className="flex-items-center gap-5 p-3 ">
     <i className="ri-money-rupee-circle-line"></i>
       <div>
           <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
           <p className="text-sm -mt-1 text-gray-600">Cash </p>
       </div>

     </div>
    </div>
    
    </div>
                    <button className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Make Payment </button>
            </div>
        </div>
    );
}           

export default Riding;