

const User = require('../models/userModel');
const createError = require('../utils/appError')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
// regiter user

exports.signup = async (req , res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return next(new createError('User already exists!',400))
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        const newUser = await User.create({
            ...req.body ,
            password : hashedPassword 
        })
        

        "assign JWT (json web token)"
        const token = jwt.sign({id:newUser.insertId}, "sekretkey123", {
            expiresIn: "90d"
        });
        

        res.status(201).json({
            status:"success",
            message:'User registred succesfully' ,
            token,
            user:{
                id:newUser.id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role,
                score:newUser.score ,
            },
        })
        console.log("user created succefully")
        
    }catch(error){
        
        next(error)
    }
}



exports.login = async (req , res, next) => {
    
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        console.log(email)
        if (!user) return next(new createError('User not found!',404));
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid){
            return next(new createError('Incorrect email or password',401));
        }
       
       
        const token = jwt.sign({id:user.id}, "sekretkey123", {
            expiresIn: "90d"
        });
        
        res.status(200).json({
            status:'success',
            token,
            message:'Logged in successfully.',
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role,
                score:user.score,
            },
        })
       
    }catch(error){
        next(error)
    }
} ;


exports.verifyToken = async (req , res, next) => {
    try{
        const token = req.headers['authorization'];
        
        if(!token) return next(new createError('token is required',403));
        jwt.verify(token,'sekretkey123' ,(err,decoded) =>{
            if (err) return next(new createError('invalid token',401));
            req.userData = decoded.id;
            console.log(req.userData)
            next();
        })
        
        
    }catch(error){
        next(error)
    }
} ;
// if an error occures it will pass it to the globale error handler and skip the '/protectd'
// route handler
// the global error handler sendsa JSON response with the error status and message
// next without argument will pass the req  and res to the  ''protected' route handler



exports.addScore = async (req, res, next) => {
    try {
        const { id, score } = req.body;

        if (score === undefined || id === undefined) {
            return next(createError(400, 'ID and score must be provided'));
        }
        
        const messageObj = await User.addScore({ id, score });
        if (messageObj.success) {
            console.log("success");
            return res.status(200).json({
                status: 'success',
                message: 'Score added successfully.',
                score: score,
            });
        } else {
            return next(createError(500, 'Failed to add score.'));
        }
    } catch (error) {
        next(error);
    }
};
