const express = require('express')

const router = express.Router();
const userController = require('../controllers/user.controller') 
const {body} = require("express-validator")
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Fullname must be of atleast 3 length'),
    body('password').isLength({min:6}).withMessage('Password must be of atleast 6 character'),




],
userController.registerUser
)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be of atleast 6 character'),

],
userController.loginUser
)
module.exports = router

router.get('/profile',userController.getProfile)