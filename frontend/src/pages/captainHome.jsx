import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/socketContext";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);

  const [liveTrackingVisible, setLiveTrackingVisible] = useState(true);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain._id]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (ConfirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-4 top-0 flex items-center justify-between w-screen z-20">
        <img className="w-16" src="../images/captainlogo.jpg" alt="" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full ${
          liveTrackingVisible ? "z-10" : "z-[-1]"
        }`}
      >
        <LiveTracking />
      </div>

      <div className="h-2/5 top-[66%] p-6 z-10 relative">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-30 translate-y-full bottom-0 px-3 py-10 bg-white pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={ConfirmRidePopUpPanelRef}
        className="fixed w-full z-30 h-screen translate-y-full bottom-0 px-3 py-10 bg-white pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
