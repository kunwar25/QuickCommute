import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "24px",
      });
    } else {
      gsap.to(panelRef.current, {
        height: 0,
      });
    }
  }, [panelOpen]);

  const handleInputClick = () => {
    if (!panelOpen) {
      setPanelOpen(true); // Only open the panel when it is not already open
    }
  };

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="../images/quickcommutelogo.jpg"
        alt="QuickCommute Logo"
      ></img>

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://www.uberpeople.net/attachments/381410/"
          alt="Background"
        ></img>
      </div>
      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          {/* Toggle Button */}
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-6 right-6 text-xl cursor-pointer"
          >
            <i
              className={`ri-arrow-${
                panelOpen ? "down" : "up"
              }-wide-line transition-transform`}
            ></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={handleInputClick} // Handle input click
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={handleInputClick} // Handle input click
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
            <button className="bg-black text-white px-4 py-2 rounded mt-4 w-full">
              Search
            </button>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0 transition-height">

              <LocationSearchPanel />

        </div>
      </div>
    </div>
  );
};

export default Home;
