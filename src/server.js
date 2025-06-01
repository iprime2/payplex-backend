"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./config/data-source");
const logger_1 = __importDefault(require("./config/logger"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
data_source_1.AppDataSource.initialize()
    .then(() => {
    logger_1.default.info('Database connected');
    app_1.default.listen(PORT, () => {
        logger_1.default.info(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    logger_1.default.error('Database connection failed: ' + error);
    process.exit(1);
});
