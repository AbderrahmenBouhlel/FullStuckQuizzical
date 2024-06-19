
const { GoogleGenerativeAI } = require('@google/generative-ai')
const CreateError = require('../utils/appError')
require('dotenv').config({path:require('path').resolve(__dirname,'../.env')});



const API_KEY = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY);

exports.getHint = async (req,res,next) =>{
    const questions = req.body.questions;
    const prompt = `Please provide advanced hints for each of these quiz questions in the format of a JSON array of strings, without any additional text or explanation. Only return the JSON array. Questions: ${questions}`;
    try{
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const text = response.text() ;
       
        res.status(201).json({text})

      
    }
    catch(error){
        console.error(error);
        next(new  CreateError('Errorgetting hint rom OpenAI API'));
    }

}
    
    
