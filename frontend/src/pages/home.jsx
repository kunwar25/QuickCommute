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
  navigate('/riding')
})


const handlePickupChange = async (e) => {
  const value = e.target.value;
  setPickup(value);

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
        className="w-16 absolute left-5 top-5"
        src="../images/quickcommutelogo.jpg"
        alt="QuickCommute Logo"
      />

      {/* Background */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://www.uberpeople.net/attachments/381410/"
          alt="Background"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        {/* Top Panel */}
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-6 right-6 text-xl cursor-pointer"
          >
            <i
              className={`ri-arrow-${panelOpen ? "down" : "up"}-wide-line transition-transform`}
            ></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => setPanelOpen(true)}
              className="bg-gray-200 px-4 py-2 rounded-lg w-full mt-2"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => setPanelOpen(true)}
              className="bg-gray-200 px-4 py-2 rounded-lg w-full mt-3"
              placeholder="Enter your destination"
            />
            {/* <button className="bg-black text-white px-4 py-2 rounded mt-4 w-full">
              Search
            </button> */}
          </div>

          <button 
          onClick={findTrip}
          className="bg-black text-white px-4 py-2 rounded mt-4 w-full">
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
        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full pt-12"
        >
          <LookingForDriver setVehicleFound={setVehicleFound}
          pickup = {pickup}
          destination = {destination}
          fare = {fare}
          vehicleType = {vehicleType}
          createRide = {createRide}
           />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full pt-12"
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
