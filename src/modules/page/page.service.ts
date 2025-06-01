// src/modules/page/page.service.ts
import { AppDataSource } from '../../config/data-source';
import { Page } from './entity/page.entity';

export const PageRepo = AppDataSource.getRepository(Page);

export const createPage = async (data: Partial<Page>) => {
  const page = PageRepo.create(data);
  return await PageRepo.save(page);
};

export const getAllPages = async () => {
  return await PageRepo.find({ order: { createdAt: 'DESC' } });
};

export const getPageById = async (id: string) => {
  return await PageRepo.findOneBy({ id });
};

export const updatePage = async (id: string, payload: Partial<Page>) => {
  if (!Object.keys(payload).length) {
    throw new Error('No data provided for update');
  }

  const result = await PageRepo.update(id, payload);

  if (result.affected === 0) {
    throw new Error('Page not found or nothing was updated');
  }

  return await PageRepo.findOneBy({ id });
};

export const deletePage = async (id: string) => {
  return await PageRepo.delete(id);
};

export const togglePageStatus = async (id: string) => {
  const page = await getPageById(id);
  if (!page) throw new Error('Page not found');
  page.isActive = !page.isActive;
  return await PageRepo.save(page);
};
