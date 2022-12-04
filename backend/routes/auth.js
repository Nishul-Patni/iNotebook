const express = require('express');
const router= express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = "KISIkoMtbaTAna";


//1. create user route
router.post('/signup', [//validation krra hun yaha pe middlewares ki madat se
    body("name", "Name length should be at least 5").isLength({min:3}),
    body("email", "Not a valid email").isEmail(),
    body("password", "Password is too short").isLength({min:8}),
    body("password", "Password is not strong").isStrongPassword()
],async (req, res)=>{
    
    // agr validation ke time kuch errors aaye to use check krra hun
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // kuch chij user ne galat enter ki hai to use bad req response or error bhejra hun
        res.status(400).json({error: errors});
        return;
    }

    try{
        // dhekra hun ki email phele se exist to ni krta
        let user = await User.findOne({email:req.body.email});

        if(user){
            // agr krta hai to user ko batara hun
            res.status(400).json({error: "User already exist with this email"})
            return;
        }

        // password ka hash bana raha hun
        const salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt);

        // user ko create krra hun
        user = await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email
        })
        
        let data = {
            user : {
                id : user.id
            }
        }

        let authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken}); //{userToken} = {userToken : userToken}
    }catch(error){
        console.log(error);
        res.json({error:"Opps! Something went wrong"});
    }


})


// 2. loging route /api/auth/login (using email and password)
router.post('/login', [
    body("email").isEmail(),
    body("password").exists()
],
 async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors});
        return;
    }

    try{
        let {email, password} = req.body;

        let user = await User.findOne({email});

        if(!user){
            res.status(400).json({error:"Email or Password may be wrong 1"});
            return;
        }
        
        let isCorrectPass = await bcrypt.compare(password, user.password);
        // console.log(user, password, isCorrectPass);
        if(isCorrectPass){
            let data = {
                user : {
                    id : user.id
                }
            }
            let authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
        }else{
            res.status(400).json({error:"Email or Password may be wrong 2"});
            return;
        }
    }catch(error){
        console.log(error);
        res.status(500).send({error: "Internal Server Error"});
    }
 }
)

// 3. get user using token /api/auth/getUser
// fetch user middleware hai jo user ko token se authenticate krta hai
router.get('/getUser', fetchUser, async (req, res)=>{
    try{
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        
        // agr user milta hai bina kisi error ke
        res.send({user})
    }catch(error){
        // agr kuch error aagyi to
        console.log(error);
        res.status(500).send({error: "Internal Server Error"});
    }
})

module.exports = router;