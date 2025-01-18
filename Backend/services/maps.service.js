const axios = require('axios');
const captainModel = require('../models/captain.model');

// Function to get coordinates (eLoc) from address
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://atlas.mapmyindia.com/api/places/geocode?address=${encodeURIComponent(address)}`;

    try {
        // Get the access token
        const tokenResponse = await axios.post(
            'https://outpost.mapmyindia.com/api/security/oauth/token',
            null,
            {
                params: {
                    grant_type: 'client_credentials',
                    client_id: process.env.MAPMYINDIA_CLIENT_ID,
                    client_secret: process.env.MAPMYINDIA_CLIENT_SECRET,
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        // Make the geocoding request
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Access the eLoc from the copResults object
        const eLoc = response.data.copResults?.eLoc;

        if (!eLoc) {
            throw new Error('eLoc not found in the response. Please verify the address.');
        }

        return eLoc;
    } catch (err) {
        console.error('Error in getAddressCoordinate:', err.response ? err.response.data : err.message);
        throw new Error('Failed to fetch coordinates. Please check the address or try again later.');
    }
};

// Function to get distance and time between two locations
module.exports.getDistanceAndTime = async (source, destination) => {
    const sourceEloc = await this.getAddressCoordinate(source); // Get the eLoc for the source
    const destinationEloc = await this.getAddressCoordinate(destination); // Get the eLoc for the destination
    const baseUrl = `https://apis.mapmyindia.com/advancedmaps/v1`;
    const restKey = process.env.MAPMYINDIA_API_KEY; // Get the REST API key from the environment
    const resource = "distance_matrix"; // Use "distance_matrix" as the resource
    const profile = "driving"; // Set default profile as "driving"

    // Combine source and destination eLocs into the required geopositions format
    const geopositions = `${sourceEloc};${destinationEloc}`;

    const url = `${baseUrl}/${restKey}/${resource}/${profile}/${geopositions}`;

    try {
       
        const response = await axios.get(url);

        
        const { distances, durations } = response.data.results;

       
        const distance = distances[0][1]; 
        const duration = durations[0][1]; 

        return { distance, duration };
    } catch (err) {
        console.error(
            'Error in getDistanceAndTime:',
            err.response ? err.response.data : err.message
        );
        throw new Error('Failed to fetch distance and time. Please try again later.');
    }
};

// Function to get suggestions for an incomplete address


module.exports.getSuggestions = async (query) => {
  const url = `https://atlas.mapmyindia.com/api/places/search/json?query=${encodeURIComponent(query)}`;

  try {
    // Get the access token
    const tokenResponse = await axios.post(
      "https://outpost.mapmyindia.com/api/security/oauth/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
          client_id: process.env.MAPMYINDIA_CLIENT_ID,
          client_secret: process.env.MAPMYINDIA_CLIENT_SECRET,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Make the search request
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const suggestions = response.data.suggestedLocations.map((location) => ({
      name: location.placeName,
      address: location.placeAddress,
      eLoc: location.eLoc,
    }));

    return suggestions;
  } catch (err) {
    console.error(
      "Error in getSuggestions:",
      err.response ? err.response.data : err.message
    );
    throw new Error("Failed to fetch suggestions. Please try again later.");
  }
};






async function getDistance(sourceELOC, destLat, destLng) {
  const baseUrl = `https://apis.mapmyindia.com/advancedmaps/v1`;
  const restKey = process.env.MAPMYINDIA_API_KEY; // Get the REST API key from the environment
  const resource = "distance_matrix"; // Use "distance_matrix" as the resource
  const profile = "driving"; // Set default profile as "driving"

  // Combine source (eLoc) and destination (latitude, longitude) into geopositions format
  const geopositions = `${sourceELOC};${destLat},${destLng}`;

  // Specify the source and destination indexes
  const sources = "0"; // source index, since it's the first element
  const destinations = "1"; // destination index, since it's the second element

  const url = `${baseUrl}/${restKey}/${resource}/${profile}/${geopositions}?sources=${sources}&destinations=${destinations}`;

  try {
    // Make the API call
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Log the full response to debug

    // Extract distances and durations from the response
    const { distances, durations } = response.data.results;

    // Log the raw distances and durations
    console.log('Distances:', distances);
    console.log('Durations:', durations);

    // Check if the response is structured as expected (nested array structure)
    if (distances && Array.isArray(distances[0]) && distances[0].length > 0) {
      const distance = distances[0][0];  // Distance in meters (first element of the first nested array)
      const duration = durations[0][0];  // Duration in seconds (first element of the first nested array)

      console.log('Distance:', distance);  // Log distance
      console.log('Duration:', duration);  // Log duration

      return distance / 1000; // Convert distance to kilometers
    } else {
      throw new Error('Invalid response structure or missing distance data');
    }
  } catch (err) {
    console.error('Error in getDistance:', err.response ? err.response.data : err.message);
    throw new Error('Failed to fetch distance. Please try again later.');
  }
};


// Updated function to ensure the API response is sent once
module.exports.getCaptainsIntheRadius = async (userELOC) => {
  // Radius in kilometers
  const radius = 5000; // You can change this as needed

  try {
    const captains = await captainModel.find(); // Fetch all captains

    const nearbyCaptains = [];
    for (const captain of captains) {
      // Ensure captain's location is valid
      if (!captain.location || captain.location.ltd === undefined || captain.location.lng === undefined) {
        console.warn(`Captain ${captain._id} has invalid location data`);
        continue; // Skip this captain if location is invalid
      }

      const { ltd, lng } = captain.location; // Access ltd and lng

      // Get the distance between the user and captain
      const distance = await getDistance(userELOC, ltd, lng); // Pass the correct parameters

      console.log(`Distance from user to captain ${captain._id}: ${distance} m`);

      // Check if the captain is within the specified radius
      if (distance <= radius) {
        nearbyCaptains.push(captain);
      }
    }

    return nearbyCaptains;
  } catch (error) {
    console.error('Error finding nearby captains:', error.message);
    throw error;
  }
};

  

 


