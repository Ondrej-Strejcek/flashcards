const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//@route    /api/auth/register
//@desc     Register a new users
//@access   Public
router.post('/register',async (req, res) => {
    try {
        //Check if email is not already taken
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).json({
            "err": "Email is already taken",
        });

        //Check if username is not already taken
        const usernameExist = await User.findOne({username: req.body.username});
        if(usernameExist) return res.status(400).json({
            "err": "Username is already taken"
        });

        //Check if passwords match
        if(req.body.password !== req.body.password2){
            console.log(1)
            return res.status(400).json({
                "err": "Passwords doesn\'t match.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPW,
        });
        console.log(user)
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200).json({
            token: token,
            isSuccess: true
        });
    }catch(error){
        res.status(400).send(error);
    }
});


//@route    /api/auth/login
//@desc     Login
//@access   Public
router.post('/login',async (req, res) => {

    const user = await User.findOne({email: req.body.email});

    //Check if user exist
    if(!user) return res.status(400).json({
        "err": "Email or password is wrong",
        "isSuccess": false,
    });

    //Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({
        "err": "Email or password is wrong",
        "isSuccess": false,
    });

    const token = jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET);
    res.status(200).json({
        "msg": "Successfully logged in.",
        "isSuccess": true,
        "token": token,
    });
});




module.exports = router;