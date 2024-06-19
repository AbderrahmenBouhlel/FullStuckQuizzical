// index.js

const express = require('express');
const {getConnection} = require('./db.js')
const authRouter = require('./routes/authRoute.js');
const cors = require('cors');


const app = express(); // Variable represents an instance of the Express.js framework. It's essentially your entire web application, responsible for handling HTTP requests and generating responses.

// 1) MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRouter);




// 4) GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({ //res.status(err.statusCode): Sets the HTTP status code of the response to the value provided by err.statusCode
        status: err.status,
        message: err.message,
    });
});

// 5) SERVER
const PORT = 3000;
getConnection().then(()=>{
    app.listen(PORT, () => {
        console.log(`App running on ${PORT}`);
    });
}).catch(err =>{
    console.error('Failed to initialize connection' , err)
})























/*
res represents the HTTP response object in Express.js. It contains both headers and a body.

.json({ status: err.status, message: err.message }) converts the provided JavaScript object into JSON format and sets it as the response body.


*/