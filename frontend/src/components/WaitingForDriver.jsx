import React from "react";

const WaitingForDriver = (props) => {
    return (
        <div>
        <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
       props.WaitingForDriver(true);
     }}></h5>
     <div className="flex items-center justify-between">
        <img className="h-12" src="../images/car.png" alt="" />
        <div className="text-right">
        <h2 className="text-lg font-medium ">
            Ahmedh Pravin
        </h2>
        <h4 className="text-xl font-semibold -mt-1 -mb-1">
            MH12 AC 4521
        </h4>
        <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
     </div>
     </div>
     
    <div className="flex gap-2 flex-col justify-between items-center">
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
    
    </div>
   </div>
    );
}

export default WaitingForDriver;