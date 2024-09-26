const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const jwtPassword = process.env.JWT_SECRET;
const { createUser,loginUser } = require('../validator');

exports.signup = async(req,res) => {
    const payload  = req.body;
    const parsedPayload = createUser.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            message : parsedPayload.error.issues.map(e=>e.message)
        })
        return;
    }
    const isExistingUser = await userModel.findOne({email:payload.email});
    if(isExistingUser){
        return res.status(400).json({
            message : `User with email ${payload.email} already exists. Please try with different email`
        })
    }
    try{
        const newUser = await userModel.create({
            name : payload.name,
            email : payload.email,
            password : payload.password
        })
    }catch(err){
        return res.status(400).json({
            message : 'Error occured while creating user'
        })
    }
    res.status(201).json({
            message : `User ${payload.name} created successfully..!`
    })
}

exports.login = async(req,res) => {
    const payload = req.body;
    const parsedPayload = loginUser.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: parsedPayload.error.issues.map(e=>e.message)
        })
        return;
    }
    const existingUser = await userModel.findOne({email:payload.email});
    if(!existingUser){
         res.status(400).json({
            message : `User doesn't exist. Please Signup to continue..!`
        })
    }
    else if(await existingUser.comparePasswords(payload.password)){
        const token = jwt.sign({id:existingUser._id},jwtPassword,{expiresIn:'1h'});
        res.cookie('access_token', token, {
            httpOnly: true
          }).status(200).json({
            message :`Welcome ${existingUser.name}`,
            token
        });
    }
    else{
        res.status(400).json({
            message : `Please enter valid password for user ${existingUser.name}`
        })
    }
}

exports.authenticate = async(req,res,next) => {
    const token = req.cookies.access_token;
    try{
        const decoded = await jwt.verify(token,jwtPassword);
        const uid = decoded.id;
        let user = await userModel.findOne({_id:uid},'email name -_id');
        req.userMail = user.email;
        req.userId = uid;
        if(!user){
            res.status(400).json({
                message : "Invalid token passed! please try again..!"
            });
        }
    }catch(err){
        return res.status(403).send("Invalid Authorization");
    }
    next();
}

exports.logout = (req,res)=>{
    res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
}
