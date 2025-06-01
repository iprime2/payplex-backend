"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = require("@/utils/logger");
const errorHandler = (err, req, res, _next) => {
    // Log the error with timestamp
    logger_1.logger.error({
        route: req.originalUrl,
        method: req.method,
        message: err.message,
        stack: err.stack,
    });
    // Handle validation errors
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
        });
    }
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
