import React from "react";

const VehiclePanel = (props) => {
    return (
        <div>
           <h5 className="p-1 w-[93%] text-center absolute top-0" onClick={()=>{
        props.setConfirmRidePanel(true);
      }}><i className="ri-arrow-down-line text-3xl text-gray-200"></i></h5>
          <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
           <div 
           onClick={()=>{
            props.setConfirmRidePanel(true);
          }}
           className=" flex mb-2 p-3 w-full border-2  active:border-black rounded-xl items-center justify-between">
           <img className="h-12" src="../images/car.png" />
            <div className=" -ml-2 w-1/2 text-center">
              <h4 className="font-medium text-base">
                ComfyCab
                <span>
                <i class="ri-user-3-fill">4</i>
                </span></h4>
                <h5 className="font-medium text-sm">2 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, comfy rides</p>
                
              
              
            </div>
            <h2 className="text-lg font-semibold">₹193.56</h2>
           </div>

           <div onClick={()=>{
        props.setConfirmRidePanel(true);
      }}className=" flex mb-2 p-3 w-full border-2  active:border-black rounded-xl items-center justify-between">
           <img className="h-12" src="../images/rickashaw.png" />
            <div className=" w-1/2 -ml-2 text-center">
              <h4 className="font-medium text-base">
              TukTukXpress
                <span>
                <i class="ri-user-3-fill">2</i>
                </span></h4>
                <h5 className="font-medium text-sm">8 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, open-air</p>
                
              
              
            </div>
            <h2 className="text-lg font-semibold">₹110.23</h2>
           </div>

           <div onClick={()=>{
        props.setConfirmRidePanel(true);
      }}className=" flex mb-2 p-3 w-full border-2 active:border-black rounded-xl items-center justify-between">
           <img className="h-12" src="../images/moto1.png" />
            <div className=" w-1/2 -ml-2 text-center">
              <h4 className="font-medium text-base">
              RapidRide
                <span>
                <i class="ri-user-3-fill">1</i>
                </span></h4>
                <h5 className="font-medium text-sm">6 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, fast</p>
                
              
              
            </div>
            <h2 className="text-lg font-semibold">₹80.56</h2>
           </div>
 
        </div>
    );
}

export default VehiclePanel;