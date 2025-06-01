"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedAdmin;
// src/seeders/admin.seed.ts
const data_source_1 = require("../config/data-source");
const user_entity_1 = require("../modules/user/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
function seedAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
        const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const existingAdmin = yield userRepository.findOneBy({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const admin = userRepository.create({
                email: 'admin@example.com',
                password: yield bcrypt_1.default.hash('admin123', 10),
                role: user_entity_1.UserRole.ADMIN,
            });
            yield userRepository.save(admin);
            console.log('✅ Admin user seeded.');
        }
        else {
            console.log('ℹ️ Admin user already exists.');
        }
        const existingUser = yield userRepository.findOneBy({ email: 'user@example.com' });
        if (!existingUser) {
            const admin = userRepository.create({
                email: 'user@example.com',
                password: yield bcrypt_1.default.hash('admin123', 10),
                role: user_entity_1.UserRole.USER,
            });
            yield userRepository.save(admin);
            console.log('✅ User user seeded.');
        }
        else {
            console.log('ℹ️ User user already exists.');
        }
        yield data_source_1.AppDataSource.destroy();
    });
}
