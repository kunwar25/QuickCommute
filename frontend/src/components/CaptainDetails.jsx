import React from "react";
import { useContext } from "react";
import {CaptainDataContext} from "../context/captainContext";
const CaptainDetails = () => {

    const {captain} = useContext(CaptainDataContext);
    return(
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img className ="h-10 w-10 rounded-full object-cover "src="../images/driver.jpg" alt="" />
                    <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">₹295.52</h4>
                    <p className="text-sm  text-gray-600 text-center">Earned</p>
                </div>
            </div>
                <div className="flex justify-center gap-5 items-start mt-6 p-6 bg-gray-100 rounded-xl ">
                    <div className="text-center "> 
                        <i className="ri-timer-2-line text-3xl  font-thin"></i>
                        <h5 className="text-lg font-medium">10.2</h5>
                        <p className="text-sm text-gray-600">Hours Online</p>
                    </div>
                    
                    <div className="text-center">
                    <i className="ri-speed-up-line text-3xl font-thin"></i>
                    <h5 className="text-lg font-medium">20 Km/h</h5>
                    <p className="text-sm text-gray-600 ">Speed</p>
                    </div>
                    <div    className="text-center">
                        <i className="ri-booklet-line text-3xl font-thin"></i>
                        <h5 className="text-lg font-medium ">1</h5>
                        <p className="text-sm text-gray-600">Notes</p>
                    </div>
                </div>
        </div>
    )
}

export default CaptainDetails;