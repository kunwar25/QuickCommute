const express = require('express')
const captainController = require('../controllers/captain.controller')
const router = express.Router();
const {body} = require('express-validator')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be of atleast # characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 6 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate number must be at least 6 characters long'),
    body('vehicle.capacity').isInt({min:3}).withMessage('Capacity number must be at least 6 characters long'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle'),
    
],
captainController.registerCaptain
)
module.exports = router