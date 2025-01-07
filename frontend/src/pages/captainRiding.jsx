import React from "react";
import { Link } from "react-router-dom";

const CaptainRiding = () => {
    return (
        <div className="h-screen relative">
            
        <div className="fixed p-4 top-0 flex items-cente justify-between w-screen">
         <img className='w-16' src="../images/captainlogo.jpg" alt="" />
         <Link to='/home'className=" h-10 w-10 bg-white flex items-center justify-center rounded-full ">
             <i className="text-lg font-medium ri-logout-box-r-line"></i>
         </Link>
        </div>
         <div className="h-4/5">
         
         <img
       className="h-full w-full object-cover"
       src="https://www.uberpeople.net/attachments/381410/"
       alt="Background"
     ></img>
         </div>
            
         <div className="h-1/5 relative p-6 bg-yellow-400 flex  items-center justify-between">

         <h5 className="p-1 w-[95%] text-center absolute top-0" onClick={()=>{
            
        }}><i class="ri-arrow-up-wide-fill text-2xl font-semibold text-black-400"></i></h5>
            <h4 className="text-xl font-semibold ">4 KM away</h4>
            <button className="bg-green-600 text-white font-semibold p-2 px-10 rounded-lg">Complete Ride</button>
         </div>

        
     </div>
    )
}


export default CaptainRiding;