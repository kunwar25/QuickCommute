const express = require('express');

const router = express.Router();
const {body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');
router.post('/create',
   authMiddleware.authUser,
    body('source').isString().isLength({min:3}).withMessage('Source is required'),
    body('destination').isString().isLength({min:3}).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['auto','motorcycle','car']).withMessage('Invalid vehicle type'),

    rideController.createRide
)

module.exports = router;