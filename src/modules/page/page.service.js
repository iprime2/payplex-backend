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
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePageStatus = exports.deletePage = exports.updatePage = exports.getPageById = exports.getAllPages = exports.createPage = exports.PageRepo = void 0;
// src/modules/page/page.service.ts
const data_source_1 = require("../../config/data-source");
const page_entity_1 = require("./entity/page.entity");
exports.PageRepo = data_source_1.AppDataSource.getRepository(page_entity_1.Page);
const createPage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const page = exports.PageRepo.create(data);
    return yield exports.PageRepo.save(page);
});
exports.createPage = createPage;
const getAllPages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.PageRepo.find({ order: { createdAt: 'DESC' } });
});
exports.getAllPages = getAllPages;
const getPageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.PageRepo.findOneBy({ id });
});
exports.getPageById = getPageById;
const updatePage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(payload).length) {
        throw new Error('No data provided for update');
    }
    const result = yield exports.PageRepo.update(id, payload);
    if (result.affected === 0) {
        throw new Error('Page not found or nothing was updated');
    }
    return yield exports.PageRepo.findOneBy({ id });
});
exports.updatePage = updatePage;
const deletePage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.PageRepo.delete(id);
});
exports.deletePage = deletePage;
const togglePageStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield (0, exports.getPageById)(id);
    if (!page)
        throw new Error('Page not found');
    page.isActive = !page.isActive;
    return yield exports.PageRepo.save(page);
});
exports.togglePageStatus = togglePageStatus;
