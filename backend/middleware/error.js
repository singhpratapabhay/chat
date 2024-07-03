import ErrorHandler from "../utils/errorHandler";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "internal Server Error",
    };


    //Handle Invalid Mongoose ID Error
    if (err.name === "CastError") {
        const message = `Resourse not found. or  invalid:${err?.path} `
        error = new ErrorHandler(message, 404)
    }

    //Handle Mongoose Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate: ${Object.keys(err.keyValue)} entered. `
        error = new ErrorHandler(message, 400)
    }


    //Handle Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid. Try Again`
        error = new ErrorHandler(message, 400)
    }

    //Handle Wrong JWT token expired Error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token expired. Try Again`
        error = new ErrorHandler(message, 400)
    }


    //handle Validation Error 
    if (err.neme === "ValidationError") {
        const message = Object.values(err.errors)
        error = new ErrorHandler(message, 400)
    }

    //handle Error in Development 
    if (process.env.NODE_MODE === "Development") {
        res.status(error.statusCode).json({
            message: err.message,
            error: err,
            stack: err?.stack
        })

    }

    //handle Error in Production 
    if (process.env.NODE_MODE === "Production") {
        res.status(error.statusCode).json({
            message: err.message,
        })

    }
}