import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPanelOpen,
  setVehiclePanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.name);
    } else if (activeField === "destination") {
      setDestination(suggestion.name);
    }
    // setVehiclePanelOpen(true); // Open vehicle panel
    // setPanelOpen(false); // Close suggestions panel
  };

  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex gap-4 border-2 p-3 border-gray-50 hover:border-black rounded-xl items-center my-2 cursor-pointer"
          >
            <i className="ri-map-pin-fill"></i>
            <div>
              <h4 className="font-medium">{suggestion.name}</h4>
              <p className="text-sm text-gray-500">{suggestion.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500"></p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
