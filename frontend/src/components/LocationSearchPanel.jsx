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
      setPickup(suggestion.name + ", "+suggestion.address);
    } else if (activeField === "destination") {
      setDestination(suggestion.name + ", "+ suggestion.address);
    }
    // setVehiclePanelOpen(true); // Open vehicle panel
    // setPanelOpen(false); // Close suggestions panel
  };

  return (
    <div>
      <div className="mt-10"></div>
      {suggestions.slice(0, 10).length > 0 ? (
        suggestions.slice(0, 10).map((suggestion, idx) => (
          <div 
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex gap-1 border-2 p-2 border-gray-50 hover:border-blue rounded-xl items-center cursor-pointer"
          >
            <i className="px-5 ri-map-pin-fill"></i>
            <div className="px-2">
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
