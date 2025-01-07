import React from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {    
    return(
        <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
            props.setRidePopUpPanel(false);
     }}><i class="ri-arrow-down-wide-fill text-2xl font-semibold text-gray-400"></i></h5>

     <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start?  </h3>
     <div className="flex items-center justify-between bg-yellow-400 rounded-lg p-3 mt-4">
        <div className="flex items-center gap-3">
            <img className="h-12 w-10 rounded-full object-cover" src="../images/user.jpg" alt="" />
            <h2 className="text-lg font-medium">
                Sumitam Pandey
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
           <p className="text-sm -mt-1 text-gray-600">GogaJheel Talab, Manihari</p>
       </div>
     </div>
     <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200 ">
     <i className = " text-lg ri-map-pin-user-fill"></i>
       <div>
           <h3 className="text-lg font-medium">562/11-A </h3>
           <p className="text-sm -mt-1 text-gray-600">GogaJheel Talab, Manihari</p>
       </div>
     </div>
     <div className="flex items-center gap-5 p-3 ">
     <i className="ri-money-rupee-circle-line"></i>
       <div>
           <h3 className="text-lg font-medium">₹153.86 </h3>
           <p className="text-sm -mt-1 text-gray-600">Cash </p>
       </div>

     </div>
    </div>
    <Link to='/captain-riding' 
    
    className="mt-5 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">Confirm </Link>

<button 
    onClick={()=>{
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
    }}
    className="mt-1 w-full bg-red-700 text-white font-semibold p-3 rounded-lg">Cancel </button>
    
    </div>
   </div>

    )

}

export default ConfirmRidePopUp;