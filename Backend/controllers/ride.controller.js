const rideService = require('../services/ride.service');    
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {userId,source,destination,vehicleType} = req.body;

    try {
        const ride = await rideService.createRide({user:req.user._id,source,destination,vehicleType});
        res.status(201).json({success:true,data:ride});

        const eLocs = await mapService.getAddressCoordinate(source);
        console.log(eLocs);
        const captainInRadius = await mapService.getCaptainsIntheRadius(eLocs);

        ride.otp = ""

        const rideWithuser = await rideModel.findOne({_id:ride._id}).populate('user');
        captainInRadius.map(async captain => {
        sendMessageToSocketId(captain.socketId,{
            event:'new-ride',
            data:rideWithuser
        });

        })
       

        
    }
    catch(err){
        res.status(500).json({success:false,message:err.message});
    }

}


module.exports.getFair = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {source,destination} = req.query;
    // console.log(source);
    // console.log(destination);

    try {
        const fare = await rideService.getFare(source,destination);
        res.status(200).json({success:true,data:fare});
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}