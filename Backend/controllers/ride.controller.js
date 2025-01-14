const rideService = require('../services/ride.service');    
const { validationResult } = require('express-validator');

module.exports.createRide = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {userId,source,destination,vehicleType} = req.body;

    try {
        const ride = await rideService.createRide({user:req.user._id,source,destination,vehicleType});
        res.status(201).json({success:true,data:ride});
    }
    catch(err){
        res.status(500).json({success:false,message:err.message});
    }

}
