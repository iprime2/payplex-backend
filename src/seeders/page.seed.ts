// src/seeders/page.seed.ts

import { AppDataSource } from '../config/data-source';
import { Page } from '../modules/page/entity/page.entity';

export default async function seedPages() {
    await AppDataSource.initialize();
  
    const pageRepository = AppDataSource.getRepository(Page);
  
    const defaultPages: Partial<Page>[] = [
      {
        logo: 'https://example.com/logo.png',
        mailId: 'info@example.com',
        contact: '+1234567890',
        bannerImage: 'https://example.com/banner.jpg',
        header: 'Home Page',
        text: 'Welcome to the homepage of our site.',
        address: '123 Tech Street, Cityville, Country',
        isActive: true,
      },
      {
        logo: 'https://example.com/logo2.png',
        mailId: 'support@example.com',
        contact: '+1987654321',
        bannerImage: 'https://example.com/banner2.jpg',
        header: 'Contact Us',
        text: 'Feel free to contact our support team anytime.',
        address: '456 Help Ave, Townsville, Country',
        isActive: true,
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