import React, { useRef } from "react";
import { Link,useLocation } from "react-router-dom";

import { useState } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";



const CaptainRiding = () => {
    const [liveTrackingVisible, setLiveTrackingVisible] = useState(true);
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride

    useGSAP(() => {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(0%)",
          });
        } else {
          gsap.to(finishRidePanelRef.current, {
            transform: "translateY(100%)",
          });
    
        }},[finishRidePanel])



    return (
        <div className="h-screen relative">
            
        <div className="fixed p-4 top-0 flex items-cente justify-between w-screen">
         <img className='w-16' src="../images/captainlogo.jpg" alt="" />
         <Link to='/home'className=" h-10 w-10 bg-white flex items-center justify-center rounded-full ">
             <i className="text-lg font-medium ri-logout-box-r-line"></i>
         </Link>
        </div>
        <div
        className={`h-screen w-screen absolute top-0 left-0  ${
          liveTrackingVisible ? "z-[-1]" : "z-[-1]"
        }`}
      >
        <LiveTracking />
      </div>
            
         <div className="h-1/5 relative p-6 bg-yellow-400 top-[80%] flex  items-center justify-between
         "
         onClick={()=>{
            setFinishRidePanel(true);
         }}
         >

         <h5 className="p-1 w-[95%] text-center absolute top-0" onClick={()=>{
            
        }}><i class="ri-arrow-up-wide-fill text-2xl font-semibold text-black-400"></i></h5>
            <h4 className="text-xl font-semibold ">4 KM away</h4>
            <button className="bg-green-600 text-white font-semibold p-2 px-10 rounded-lg">Complete Ride</button>
         </div>

         
         <div ref = {finishRidePanelRef} className="fixed w-full z-10  translate-y-full bottom-0 px-3 py-10 bg-white  pt-12">
             
             <FinishRide ride = {rideData} setFinishRidePanel = {setFinishRidePanel} />
        
        </div>

        
     </div>
    )
}


export default CaptainRiding;