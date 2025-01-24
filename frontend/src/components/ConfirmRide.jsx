import React from "react";

const ConfirmRide = (props) => {
  let path;
  if(props.vehicleType === "auto") {
    path = "../images/rickshaw.png";
  }
  else if(props.vehicleType === "bike") {
    path = "../images/moto1.png";
  }
  else if(props.vehicleType === "car") {
    path = "../images/car.png";
  }

    return (
    <div>
         <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
        props.setConfirmRidePanel(false);
      }}></h5>
      <h3 className="text-2xl font-semibold mb-5 mx-8">Confirm your ride? </h3>
     <div className="flex gap-2 flex-col justify-between items-center">
     <img className="h-14 "src = "path" alt="" />
     <div className="w-full mt-3">

      <div className="flex items-center gap-6 p-3 border-b-2 ">
        <i className = "ri-map-pin-2-fill"></i>
        <div>
            <h3 className="text-lg font-medium">{props.pickup} </h3>
            <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 p-3 border-b-2 ">
      <i className = " text-lg ri-map-pin-user-fill"></i>
        <div>
            <h3 className="text-medium font-medium">{props.destination} </h3>
            <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 p-3 ">
      <i className="ri-money-rupee-circle-line"></i>
        <div>
            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]} </h3>
            <p className="text-sm -mt-1 text-gray-600">Cash </p>
        </div>

      </div>
     </div>
     <button 
     onClick={()=>{
        props.setVehicleFound(true);
        props.setConfirmRidePanel(false);
        props.createRide();

     }}
     className="bg-blue-600 text-white font-semibold py-1 px-6 rounded-xl shadow-md 
     hover:bg-blue-700 w-full "     >Confirm </button>
     </div>
    </div>

    );
}

export default ConfirmRide;