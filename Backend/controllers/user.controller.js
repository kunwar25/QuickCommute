const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } 
        const {fullname,email,password} = req.body;
        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        }) 

        const token = user.generateAuthToken();

        res.status(201).json({token,user});



    
}

module.exports.loginUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } 
    const {email,password} = req.body;
    const user = await userService.findUserByEmail(email);
    if(!user) return res.status(401).json({message: "Invalid user name or password"});

    const isMatch = await userModel.comparePassword(password,user.password);
    if(!isMatch) return res.status(401).json({message: "Invalid password"});

    const token = user.generateAuthToken();
    res.status(200).json({token,user});
}

