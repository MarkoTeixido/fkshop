/**
 * Async Handler Wrapper
 * Eliminates the need for try-catch blocks in every async controller.
 * Automatically catches errors and passes them to the next middleware (Global Error Handler).
 * 
 * Usage:
 * const myController = asyncHandler(async (req, res, next) => { ... });
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = asyncHandler;
