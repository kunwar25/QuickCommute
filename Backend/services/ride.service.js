const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, drop) {
    // Log the inputs
    console.log('Pickup location:', pickup);
    console.log('Drop location:', drop);

    // Validate inputs
    if (!pickup || !drop) {
        throw new Error('Pickup and drop locations are required');
    }

    try {
        // Fetch distance and time from the map service
        const response = await mapService.getDistanceAndTime(pickup, drop);
        console.log('Response from map service:', response);

        if (!response || typeof response !== 'object' || !response.distance || !response.duration) {
            throw new Error('Invalid response from map service');
        }

        const { distance, duration } = response;

        if (isNaN(distance) || isNaN(duration)) {
            throw new Error('Invalid distance or duration received from the map service');
        }

        const baseFare = {
            auto: 30,
            moto: 20,
            car: 50,
        };

        const perKmRate = {
            auto: 10,
            car: 15,
            moto: 8,
        };

        const perMinuteRate = {
            auto: 2,
            car: 3,
            moto: 1.5,
        };

        const calculateFare = {
            auto: Math.round(
                baseFare.auto + (distance / 1000) * perKmRate.auto + (duration / 60) * perMinuteRate.auto
            ),
            car: Math.round(
                baseFare.car + (distance / 1000) * perKmRate.car + (duration / 60) * perMinuteRate.car
            ),
            moto: Math.round(
                baseFare.moto + (distance / 1000) * perKmRate.moto + (duration / 60) * perMinuteRate.moto
            ),
        };

        return calculateFare;
    } catch (error) {
        console.error('Error in getFare:', error.message);
        throw error;
    }
}


module.exports.getFare = getFare;

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
