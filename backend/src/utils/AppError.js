const { HTTP_CODES } = require('./constants');

/**
 * Custom Error Class for Operational Errors.
 * Use this to throw errors that the global error handler should catch and format nicely.
 */
class AppError extends Error {
    constructor(message, statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Marks error as trusted/known

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
