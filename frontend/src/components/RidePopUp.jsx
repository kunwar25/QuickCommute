import React from "react";

const RidePopUp = (props) => {
    return(
        <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
            props.setRidePopUpPanel(false);
     }}><i class="ri-arrow-down-wide-fill text-2xl font-semibold text-gray-400"></i></h5>

     <h3 className="text-2xl font-semibold mb-5">New Ride Available! </h3>
     <div className="flex items-center justify-between bg-yellow-400 rounded-lg p-3 mt-4">
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
           <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
           <p className="text-sm -mt-1 text-gray-600">Cash </p>
       </div>

     </div>
    </div>
   <div className="flex items-center justify-between w-full mt-5 ">

   <button 
    onClick={()=>{
        props.setRidePopUpPanel(false);
        props.confirmRide()
    }}
    className="  bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg">Ignore </button>
   <button 
    onClick={()=>{
        
        props.setConfirmRidePopUpPanel(true);

    }}
    className="  bg-green-600 text-white font-semibold p-2 px-10 rounded-lg">Accept </button>


   </div>
    
    </div>
   </div>

    )

}


export default RidePopUp;