// src/seeders/page.seed.ts

import { AppDataSource } from '../config/data-source';
import { Page } from '../modules/page/entity/page.entity';

export default async function seedPages() {
    await AppDataSource.initialize();
  
    const pageRepository = AppDataSource.getRepository(Page);
  
    const defaultPages: Partial<Page>[] = [
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
      const existingPage = await pageRepository.findOneBy({ header: pageData.header });
  
      if (!existingPage) {
        const page = pageRepository.create(pageData);
        await pageRepository.save(page);
        console.log(`✅ Seeded page: ${page.header}`);
      } else {
        console.log(`ℹ️ Page already exists: ${pageData.header}`);
      }
    }
  
    await AppDataSource.destroy();
  }