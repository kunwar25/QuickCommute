const { sign } = require('jsonwebtoken');
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },

    source:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },

    status:{
        type: String,
        enum: ['pending','completed','accepted','cancelled','ongoing'],
        default: 'pending'
    }
    ,

    duration:{
        type: Number,
        
    },// in seconds 
    distance:{
        type: Number,
        
    }, // in meters
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    },

    otp:{
        type: String,
        select: false,
        required: true
    },

})

module.exports = mongoose.model('ride',rideSchema);