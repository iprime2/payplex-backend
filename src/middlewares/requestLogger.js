"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const uuid_1 = require("uuid");
const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const requestId = (0, uuid_1.v4)();
    req.requestId = requestId;
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
        logger_1.default.log(logLevel, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms - IP: ${req.ip} - ReqID: ${requestId}`);
    });
    next();
};
exports.requestLogger = requestLogger;
