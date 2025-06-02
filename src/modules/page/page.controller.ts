// src/modules/page/page.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as PageService from './page.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.logo?.[0]) {
      req.body.logo = files.logo[0].path;
    }

    if (files?.bannerImage?.[0]) {
      req.body.bannerImage = files.bannerImage[0].path;
    }

    if (typeof req.body.isActive === 'string') {
      req.body.isActive = req.body.isActive === 'true';
    }

    const page = await PageService.createPage(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};


export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const pages = await PageService.getAllPages();
    res.json({ success: true, data: pages });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = await PageService.getPageById(req.params.id);
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body || {};
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.logo?.[0]) {
      payload.logo = files.logo[0].path;
    }

    if (files?.bannerImage?.[0]) {
      payload.bannerImage = files.bannerImage[0].path;
    }

    if (typeof payload.isActive === 'string') {
      payload.isActive = payload.isActive === 'true';
    }

    const page = await PageService.updatePage(req.params.id, payload);
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};


export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PageService.deletePage(req.params.id);
    res.json({ success: true, message: 'Page deleted' });
  } catch (err) {
    next(err);
  }
};

export const toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = await PageService.togglePageStatus(req.params.id);
    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
};
