const { HTTP_CODES, MESSAGES } = require('../utils/constants');

/**
 * Global Error Handling Middleware
 * Catch-all for any errors thrown in the application.
 */
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR;
    err.status = err.status || 'error';

    // Log the error for debugging (crucial for backend engineering)
    console.error('💥 ERROR 💥', err);

    // Development vs Production Error Response logic could go here
    // For now, we return a standardized JSON
    res.status(err.statusCode).json({
        status: err.status,
        error: true,
        message: err.message || MESSAGES.SERVER_ERROR,
        // formattedErrors is used by express-validator
        errors: err.errors || undefined
    });
};

module.exports = errorHandler;
