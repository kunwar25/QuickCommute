import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
const CaptainHome = () => {

    const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
    const ridePopUpPanelRef = useRef(null);

    const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const ConfirmRidePopUpPanelRef = useRef(null);
    useGSAP(() => {
        if (ridePopUpPanel) {
          gsap.to(ridePopUpPanelRef.current, {
            transform: "translateY(0%)",
          });
        } else {
          gsap.to(ridePopUpPanelRef.current, {
            transform: "translateY(100%)",
          });
    
        }},[ridePopUpPanel])


        useGSAP(() => {
            if (ConfirmRidePopUpPanel) {
              gsap.to(ConfirmRidePopUpPanelRef.current, {
                transform: "translateY(0%)",
              });
            } else {
              gsap.to(ConfirmRidePopUpPanelRef.current, {
                transform: "translateY(100%)",
              });
        
            }},[ConfirmRidePopUpPanel])
    return(
        <div className="h-screen">

           <div className="fixed p-4 top-0 flex items-cente justify-between w-screen">
            <img className='w-16' src="../images/captainlogo.jpg" alt="" />
            <Link to='/captain-home'className=" h-10 w-10 bg-white flex items-center justify-center rounded-full ">
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
           </div>
            <div className="h-3/5">
            
            <img
          className="h-full w-full object-cover"
          src="https://www.uberpeople.net/attachments/381410/"
          alt="Background"
        ></img>
            </div>

            <div className="h-2/5 p-6">
            <CaptainDetails />
            </div>

            <div ref = {ridePopUpPanelRef} className="fixed w-full z-10  translat-y-full bottom-0 px-3 py-10 bg-white  pt-12">
             
             <RidePopUp setRidePopUpPanel = {setRidePopUpPanel} setConfirmRidePopUpPanel = {setConfirmRidePopUpPanel}/>
        
        </div>
        <div ref = {ConfirmRidePopUpPanelRef} className="fixed w-full z-10 h-screen  translat-y-full bottom-0 px-3 py-10 bg-white  pt-12">
             
             <ConfirmRidePopUp setConfirmRidePopUpPanel = {setConfirmRidePopUpPanel} setRidePopUpPanel = {setRidePopUpPanel}  />
        
        </div>
        </div>
    )
}

export default CaptainHome; 