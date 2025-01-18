const express = require('express');
const rideController = require('../controllers/ride.controller');
const router = express.Router();
const {body,query} = require('express-validator');

const authMiddleware = require('../middleware/auth.middleware');
router.post('/create',
   authMiddleware.authUser,
    body('source').isString().isLength({min:3}).withMessage('Source is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['auto','moto','car']).withMessage('Invalid vehicle type'),

    rideController.createRide
)

router.get('/get-fare',
    // authMiddleware.authUser,
    query('source').isString().isLength({min:3}).withMessage('Source is required'),
    query('destination').isString().isLength({min:3}).withMessage('Destination is required'),
    
    rideController.getFair
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),

    rideController.confirmRide

)

module.exports = router;