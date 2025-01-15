const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, drop) {
    if (!pickup || !drop) {
        throw new Error('Pickup and drop locations are required');
    }

    // Fetch distance and time from the map service
    const response = await mapService.getDistanceAndTime(pickup, drop);

    console.log('Response from map service:', response); // Log the response for debugging

    // Check if response is valid and contains distance and duration
    if (!response || typeof response !== 'object' || !response.distance || !response.duration) {
        throw new Error('Invalid response from map service');
    }

    // Destructure distance and duration directly from the response
    const { distance, duration } = response; 

    if (isNaN(distance) || isNaN(duration)) {
        throw new Error('Invalid distance or duration received from the map service');
    }

    const baseFare = {
        auto: 30,
        moto: 20,
        car: 50,
    };

    const farePerMeter = {
        auto: 0.5,
        moto: 0.3,
        car: 1,
    };

    const farePerSecond = {
        auto: 0.02,
        moto: 0.01,
        car: 0.03,
    };

    const calculateFare = (vehicleType) => {
        if (!baseFare[vehicleType] || !farePerMeter[vehicleType] || !farePerSecond[vehicleType]) {
            throw new Error('Invalid vehicle type');
        }
        return (
            baseFare[vehicleType] +
            (distance * farePerMeter[vehicleType] )/1000+
            (duration * farePerSecond[vehicleType])
        );
    };

    return {
        auto: calculateFare('auto'),
        moto: calculateFare('moto'),
        car: calculateFare('car'),
    };
}

function getOtp(num){
    if (!num || isNaN(num) || num <= 0) {
        throw new Error('Invalid number of digits for OTP');
    }

    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;

}
// Function to create a new ride
module.exports.createRide = async ({
    user, source, destination, vehicleType
}) => {
    // Validate required fields
    if (!user || !source || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Validate the vehicle type
    const validVehicleTypes = ['auto', 'moto', 'car'];
    if (!validVehicleTypes.includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    // Fetch fare based on pickup and drop
    const fare = await getFare(source, destination);

    // Create the ride with the calculated fare for the specific vehicle type
    const ride = await rideModel.create({
        user,
        source,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    return ride; 
};
