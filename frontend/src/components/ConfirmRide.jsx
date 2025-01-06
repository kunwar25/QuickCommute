import React from "react";

const ConfirmRide = (props) => {
    return (
    <div>
         <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
        props.setConfirmRidePanel(false);
      }}></h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your ride </h3>
     <div className="flex gap-2 flex-col justify-between items-center">
     <img className="h-20 "src="../images/car.png" alt="" />
     <div className="w-full mt-5">

      <div className="flex-items-center gap-5 p-3 border-b-2 border-gray-200 ">
        <i className = " text-lg ri-map-pin-2-fill"></i>
        <div>
            <h3 className="text-lg font-medium">562/11-A </h3>
            <p className="text-sm -mt-1 text-gray-600">GogaJheel Talab, Manihari</p>
        </div>
      </div>
      <div className="flex-items-center gap-5 p-3 border-b-2 border-gray-200 ">
      <i className = " text-lg ri-map-pin-user-fill"></i>
        <div>
            <h3 className="text-lg font-medium">562/11-A </h3>
            <p className="text-sm -mt-1 text-gray-600">GogaJheel Talab, Manihari</p>
        </div>
      </div>
      <div className="flex-items-center gap-5 p-3 ">
      <i className="ri-money-rupee-circle-line"></i>
        <div>
            <h3 className="text-lg font-medium">₹153.86 </h3>
            <p className="text-sm -mt-1 text-gray-600">Cash </p>
        </div>

      </div>
     </div>
     <button 
     onClick={()=>{
        props.setVehicleFound(true);
        props.setConfirmRidePanel(false);

     }}
     className="mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm </button>
     </div>
    </div>

    );
}

export default ConfirmRide;