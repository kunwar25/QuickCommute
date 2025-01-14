const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

// Route to get coordinates
router.get(
    '/get-coordinates',
    [
        query('address')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Address must be at least 3 characters long')
    ],
    // authMiddleware.authUser, // Middleware for authentication
    mapController.getCoordinates // Controller to handle the logic
);


// Route to get distance and time between a source and destination
router.get(
    '/get-distance-time',
    [
        query('source')
            .isString()
            .notEmpty()
            .withMessage('Source is required and must be a valid address.'),
        query('destination')
            .isString()
            .notEmpty()
            .withMessage('Destination is required and must be a valid address.'),
    ],
    mapController.getDistanceTime
);

router.get('/get-suggestions',mapController.getSuggestions);








module.exports = router;



