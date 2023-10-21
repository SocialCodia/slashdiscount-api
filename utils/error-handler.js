
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor);
    }

    static serverErrror = (message="Internal Server Error") => new ErrorHandler(message,500);

    static badRequest = (message="Bad Request") => new ErrorHandler(message,422);

    static notFound = (message="Not Found") => new ErrorHandler(message,404);

    static notAllowed = (message="You don't have permission to access this resources") => new ErrorHandler(message,403);

    static notAuthorized = (message="Unauhtorized Access") => new ErrorHandler(message,401);


}


module.exports = ErrorHandler;