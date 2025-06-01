"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.toggleStatus = exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const PageService = __importStar(require("./page.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const files = req.files;
        if ((_a = files === null || files === void 0 ? void 0 : files.logo) === null || _a === void 0 ? void 0 : _a[0]) {
            req.body.logo = files.logo[0].path;
        }
        if ((_b = files === null || files === void 0 ? void 0 : files.bannerImage) === null || _b === void 0 ? void 0 : _b[0]) {
            req.body.bannerImage = files.bannerImage[0].path;
        }
        const page = yield PageService.createPage(req.body);
        res.status(201).json({ success: true, data: page });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const getAll = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield PageService.getAllPages();
        res.json({ success: true, data: pages });
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield PageService.getPageById(req.params.id);
        if (!page)
            return res.status(404).json({ success: false, message: 'Page not found' });
        res.json({ success: true, data: page });
    }
    catch (err) {
        next(err);
    }
});
exports.getOne = getOne;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const payload = req.body || {};
        const files = req.files;
        if ((_a = files === null || files === void 0 ? void 0 : files.logo) === null || _a === void 0 ? void 0 : _a[0]) {
            payload.logo = files.logo[0].path;
        }
        if ((_b = files === null || files === void 0 ? void 0 : files.bannerImage) === null || _b === void 0 ? void 0 : _b[0]) {
            payload.bannerImage = files.bannerImage[0].path;
        }
        if (typeof payload.isActive === 'string') {
            payload.isActive = payload.isActive === 'true';
        }
        const page = yield PageService.updatePage(req.params.id, payload);
        res.json({ success: true, data: page });
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PageService.deletePage(req.params.id);
        res.json({ success: true, message: 'Page deleted' });
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
const toggleStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield PageService.togglePageStatus(req.params.id);
        res.json({ success: true, data: page });
    }
    catch (err) {
        next(err);
    }
});
exports.toggleStatus = toggleStatus;
