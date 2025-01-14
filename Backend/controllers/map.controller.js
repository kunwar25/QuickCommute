const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Controller to get coordinates for a single address
module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json({ success: true, eLoc: coordinates });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Controller to get distance and time between two locations
module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { source, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceAndTime(source, destination);
        res.status(200).json({ success: true, data: distanceTime });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports.getSuggestions = async (req,res) => {
    const {query} = req.query;
    try {
        const suggestions = await mapService.getSuggestions(query);
        res.status(200).json({success:true,data:suggestions});
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
}
