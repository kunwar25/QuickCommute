const axios = require('axios');
const { validationResult } = require('express-validator');


// Function to get coordinates from address
module.exports.getAddressCoordinate = async (address) => {
    const axios = require('axios');
    const apiKey = process.env.MAPMYINDIA_API_KEY; // Replace with your MapmyIndia API key
    const url = `https://atlas.mapmyindia.com/api/places/geocode?address=${encodeURIComponent(address)}`;

    try {
        // First, get the access token
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

        // Use the token to make the geocoding request
        const response = await axios.get(url, 
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },

        
        
    );

     
    } catch (err) {
        console.log(err);
        throw err;
    }
    console.log("MapmyIndia API Response:", response.data);

        return response.data.copResults || {};

    
};





// Function to get distance and time between two locations
module.exports.getDistanceTime = async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract origin and destination from query params
        let { origin, destination } = req.query;

        // Check if origin and destination are provided
        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and Destination are required' });
        }

        // Geocode origin to get lat/lng if it's an address
        if (!origin.includes(',')) {
            const originCoords = await getCoordinates(origin);
            origin = `${originCoords.lat},${originCoords.lng}`;
        }

        // Geocode destination to get lat/lng if it's an address
        if (!destination.includes(',')) {
            const destinationCoords = await getCoordinates(destination);
            destination = `${destinationCoords.lat},${destinationCoords.lng}`;
        }

        // Define MapmyIndia API URL
        const apiKey = process.env.MAPMYINDIA_API_KEY;
        const url = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/route_adv/driving/${origin};${destination}`;

        // Send request to MapmyIndia API
        const response = await axios.get(url);

        // Check if the response is successful
        if (response.data.status === 'OK') {
            const elements = response.data.rows[0].elements[0];

            // Check if the result status is ZERO_RESULTS (no route found)
            if (elements.status === 'ZERO_RESULTS') {
                return res.status(404).json({ message: 'No route found' });
            }

            // Extract distance and duration
            const distance = elements.distance;
            const duration = elements.duration;

            // Respond with the distance and duration data
            res.status(200).json({
                distance: distance, // Distance in meters
                duration: duration, // Duration in seconds
            });
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        // Handle any errors and send an appropriate response
        console.error(err);
        res.status(500).json({ message: 'Unable to fetch distance and time' });
    }
};
