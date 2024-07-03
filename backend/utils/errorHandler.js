function ErrorHandler(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    Error.captureStackTrace(error, ErrorHandler);

    return {
        message: error.message,
        statusCode: error.statusCode,
        stack: error.stack,
    };
}

export default ErrorHandler;