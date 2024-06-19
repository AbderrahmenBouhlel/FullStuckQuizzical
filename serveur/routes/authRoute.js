const express = require('express') ;
const authController = require('../controllers/authController.js');
const User = require('../models/userModel.js')
const openAIController = require('../controllers/openAiController.js')

const router = express.Router();
router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.get('/protected',authController.verifyToken  ,async (req , res) =>{
    const userData = await User.findOne({id:req.userData,email:null})
    res.status(200).json({message:'this is a protected route',  user:{
        id:userData.id,
        name:userData.name,
        email:userData.email,
        role:userData.role,
        score:userData.score,
    },})
})
router.post('/openai/getHint' , openAIController.getHint);
router.post('/openai/addscore' , authController.addScore);



module.exports = router