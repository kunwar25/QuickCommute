const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getFare(pickup,drop){
    if(!pickup || !drop){
        throw new Error('Pickup and drop locations are required');
    }
    const distanceTime = await mapService.getDistanceAndTime(pickup,drop);
    const { distance, time } = distanceTime;

    const baseFare = {
        auto: 30,
        motorcycle: 20,
        car: 50
    };

    const farePerMeter = {
        auto: 0.05,
        motorcycle: 0.03,
        car: 0.1
    };

    const farePerSecond = {
        auto: 0.02,
        motorcycle: 0.01,
        car: 0.03
    };

    const calculateFare = (vehicleType) => {
        if (!baseFare[vehicleType] || !farePerMeter[vehicleType] || !farePerSecond[vehicleType]) {
            throw new Error('Invalid vehicle type');
        }
        return baseFare[vehicleType] + (distance * farePerMeter[vehicleType]) + (time * farePerSecond[vehicleType]);
    };

    return {
        auto: calculateFare('auto'),
        motorcycle: calculateFare('motorcycle'),
        car: calculateFare('car')
    };



    
}
module.exports.createRide = async ({
    user,source,destination,vehicleType
}) =>{
    if(!user || !source || !destination || !vehicleType){
        throw new Error('All fields are required');

    }

    const fare = await getFare(source,destination);
    const ride = rideModel.create({
        user,
        source,
        destination,
        fare:fare[vehicleType]
    });

    return ride 
};


