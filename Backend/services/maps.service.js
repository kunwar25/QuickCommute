const axios = require('axios');

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

        // Make the search request
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const suggestions = response.data.suggestedLocations;

        return suggestions;
    } catch (err) {
        console.error('Error in getSuggestions:', err.response ? err.response.data : err.message);
        throw new Error('Failed to fetch suggestions. Please try again later.');
    }
};

