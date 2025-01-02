const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

module.exports.registerCaptain = async (req,res,next) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})


    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAlreadyRegistered = await captainModel.findOne({email});
    if(isCaptainAlreadyRegistered){
        return res.status(400).json({error:'Captain already registered'})
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,

        email,
        password:hashPassword,

        color : vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType

    })

   const token = captain.generateAuthToken();

    res.status(201).json({captain,token})




}

module.exports.loginCaptain = async (req,res,next) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})      
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(404).json({error:'Invalid email or password'})

    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(404).json({error:'Invalid email or password'})

    }

    const token = captain.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({token,captain})



}

module.exports.getProfile = async (req,res,next) =>{
    const captain = req.captain;
    res.status(200).json({captain})

}

module.exports.logoutCaptain = async (req,res,next) =>{
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:'Logout successfully'})

}