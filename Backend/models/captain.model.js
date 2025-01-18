const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captainSchema = mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'firstname must be at least 3 characters long']

        },
        lastname:{
            type: String,
            required: true,
            minlength: [3, 'lastname must be at least 3 characters long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: true,
        minlength: [3, 'password must be at least 8 characters long'],
        select: false
    },
    socketId:{
        type: String,
        
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 characters long']
        },

        plate:{
            type: String,
            required: true,
            minlength: [3, 'plate must be at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'motorcycle','auto']
        }

    },

    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }


})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema)
module.exports = captainModel


