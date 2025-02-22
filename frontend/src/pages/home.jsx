import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const[fare,setFare] = useState({});
  const [vehicleType,setVehicleType] = useState(null);
  const[ride,setRide] = useState(null);
  const [liveTrackingVisible, setLiveTrackingVisible] = useState(true);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();
  useEffect(()=>{

    socket.emit("join",{userId:user._id,userType:"user"})
  },[user])

  socket.on('ride-confirmed', ride => {


    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
   
})

socket.on('ride-started',ride=>{
  setWaitingForDriver(false)
  navigate('/riding',{ state: { ride } })
})


const handlePickupChange = async (e) => {
  const value = e.target.value;
  setPickup(value);
  setLiveTrackingVisible(false);

  if (value.length < 3) {
    // Clear suggestions if input is less than 3 characters
    setPickupSuggestions([]);
    return;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { query: value },
      }
    );

    const parsedSuggestions =
      response.data?.data?.map((item) => ({
        name: item.name || "Unnamed Place",
        address: item.address || "Address not available",
        eLoc: item.eLoc,
      })) || [];

    setPickupSuggestions(parsedSuggestions);
    setActiveField("pickup");
  } catch (error) {
    console.error("Error fetching pickup suggestions:", error);
  }
};

const handleDestinationChange = async (e) => {
  const value = e.target.value;
  setDestination(value);
  setLiveTrackingVisible(false);

  if (value.length < 3) {
    // Clear suggestions if input is less than 3 characters
    setDestinationSuggestions([]);
    return;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { query: value },
      }
    );

    const parsedSuggestions =
      response.data?.data?.map((item) => ({
        name: item.name || "Unnamed Place",
        address: item.address || "Address not available",
        eLoc: item.eLoc,
      })) || [];

    setDestinationSuggestions(parsedSuggestions);
    setActiveField("destination");
  } catch (error) {
    console.error("Error fetching destination suggestions:", error);
  }
};


  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  
  const togglePanel = () => {
    setPanelOpen(!panelOpen);
    setLiveTrackingVisible(false); // Hide live tracking panel when the arrow is clicked
  };



  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0%)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0%)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0%)" : "translateY(100%)",
    });
  }, [waitingForDriver]);


  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { source: pickup, destination },

      },
      
    )

    setFare(response.data.data);
  }


  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      source:pickup,
      destination,
      vehicleType
    },{
      headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }})
  // })
    console.log(response.data);
    
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        className="w-16 h-10 absolute left-5 top-5"
        src="../images/quickcommutelogo.png"
        alt="QuickCommute Logo"
      />

      {/* Background */}
      <div
        className={`h-full w-screen absolute top-0 left-0  ${
          liveTrackingVisible ? "z-[-1]" : "z-[-1]"
        }`}
      >
        <LiveTracking />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full ">
        {/* Top Panel */}
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            onClick={togglePanel}
            className="absolute top-6 right-6 text-xl cursor-pointer"
          >
            <i
              className={`ri-arrow-${panelOpen ? "down" : "up"}-wide-line transition-transform`}
            ></i>
          </h5>

          <h4 className=" text-2xl text-[#1E88E5] font-semibold">Find a trip</h4>

          <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>

<div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>

          
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
            }}
              
              className="  w-full px-12 py-2 text-sm border-2 border-gray-300 rounded-lg bg-gray-100 
             focus:outline-none focus:border-blue-500 focus:bg-white 
              placeholder-gray-500"
              placeholder="Add a pick-up location"
            />
             <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
            {/* <button className="bg-black text-white px-4 py-2 rounded mt-4 w-full">
              Search
            </button> */}
          
          </form>
          <button 
          onClick={findTrip}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md 
                   hover:bg-blue-700 w-full mt-3 ">
            Find trip
          </button>
        </div>

        {/* Dynamic Panels */}
         <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup" ? pickupSuggestions : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full pt-12"
        >
          <VehiclePanel
            selectVehicle = {setVehicleType}
            fare = {fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
        <div
          ref={confirmRidePanelRef}
          className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full pt-12"
        >
          <ConfirmRide 
          pickup = {pickup}
          destination = {destination}
          fare = {fare}
          vehicleType = {vehicleType}
          createRide = {createRide}
         
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound = {setVehicleFound} />
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white pt-12"
        >
          <WaitingForDriver 
          setWaitingForDriver={setWaitingForDriver}
          setVehicleFound={setVehicleFound}
          ride = {ride}
          waitingForDriver={waitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;