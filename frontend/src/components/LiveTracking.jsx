import React, { useEffect } from "react";

const LiveTracking = () => {
  useEffect(() => {
    let map = null;

    const initializeMap = () => {
      // Initialize the MapmyIndia map
      map = new window.MapmyIndia.Map("map", {
        center: [18.6069, 73.8751], // Default location (latitude, longitude)
        zoom: 10,
      });

      // Use browser's Geolocation API for live location
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Check if map is initialized before adding/updating marker
            if (map) {
              if (!window.liveMarker) {
                window.liveMarker = new window.L.Marker([latitude, longitude]).addTo(map);
              } else {
                window.liveMarker.setLatLng([latitude, longitude]);
              }
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    // Ensure MapmyIndia SDK is loaded before initializing the map
    if (window.MapmyIndia) {
      initializeMap();
    } else {
      console.error("MapmyIndia SDK not loaded.");
    }

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
      window.liveMarker = null;
    };
  }, []);

  return (
    
      <div id="map" className="top-0 left-0 h-[68%] w-full"></div>
    
  );
};

export default LiveTracking;
