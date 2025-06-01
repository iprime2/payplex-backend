"use strict";
// src/seeders/page.seed.ts
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
exports.default = seedPages;
const data_source_1 = require("../config/data-source");
const page_entity_1 = require("../modules/page/entity/page.entity");
function seedPages() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
        const pageRepository = data_source_1.AppDataSource.getRepository(page_entity_1.Page);
        const defaultPages = [
            {
                logo: '1748798901883-82657503.jpg',
                mailId: 'home1@example.com',
                contact: '9999999999',
                bannerImage: '1748798780570-641210199.jpg',
                header: 'Welcome to Home 1',
                text: 'This is Home 1 page content.',
                address: 'Mumbai, India',
                isActive: true,
                slug: 'home1',
            },
            {
                logo: '1748798901883-82657503.jpg',
                mailId: 'home2@example.com',
                contact: '8888888888',
                bannerImage: '1748798780570-641210199.jpg',
                header: 'Welcome to Home 2',
                text: 'This is Home 2 page content.',
                address: 'Pune, India',
                isActive: true,
                slug: 'home2',
            },
        ];
        for (const pageData of defaultPages) {
            const existingPage = yield pageRepository.findOneBy({ header: pageData.header });
            if (!existingPage) {
                const page = pageRepository.create(pageData);
                yield pageRepository.save(page);
                console.log(`✅ Seeded page: ${page.header}`);
            }
            else {
                console.log(`ℹ️ Page already exists: ${pageData.header}`);
            }
        }
        yield data_source_1.AppDataSource.destroy();
    });
}
