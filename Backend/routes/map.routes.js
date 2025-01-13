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
    authMiddleware.authUser, // Middleware for authentication
    mapController.getCoordinates // Controller to handle the logic
);

router.get('/get-distance-time',
    query('origin')
.isString().isLength({min:3}),
query('destination').isString().isLength({min:3}),
authMiddleware.authUser,
mapController.getDistanceTime
)

module.exports = router;
