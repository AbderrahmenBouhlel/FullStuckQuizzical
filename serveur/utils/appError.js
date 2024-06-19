class CreateError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.status =`${statusCode}`.startsWith('4') ? 'fail' :'error'

        Error.captureStackTrace(this,this.constructor);

    }
}

module.exports = CreateError 
// The Error.captureStackTrace() method assigns the captured call stack to the error object itself (when the erro occures), typically to a property like stack. This allows you to access the captured stack trace later on for debugging purposes.
// it will capture the call stuck from the constrcotr call ans to it s ancestor


// HTTP status codes that start with 4 indicate client errors (propbleme with the request sent by the client )
