import { Router, RequestHandler } from 'express';
import * as PageController from './page.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { uploadLogo } from '../../middlewares/upload.middleware';

const router = Router();


// router.use(authenticateJWT as unknown as RequestHandler);
// router.use(authorizeRoles('admin') as unknown as RequestHandler);

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management
 */

/**
 * @swagger
* /pages:
*   post:
*     summary: Create a new page
*     tags: [Pages]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               mailId:
*                 type: string
*                 example: admin@example.com
*               contact:
*                 type: string
*                 example: "+123456789"
*               bannerImage:
*                 type: string
*                 format: binary
*                 description: Banner image file
*               header:
*                 type: string
*               text:
*                 type: string
*               address:
*                 type: string
*               logo:
*                 type: string
*                 format: binary
*                 description: The logo image file to upload
 */
router.post(
    '/',
    authenticateJWT as unknown as RequestHandler,
    authorizeRoles('admin') as unknown as RequestHandler,
    uploadLogo.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'bannerImage', maxCount: 1 },
    ]),
    PageController.create as RequestHandler
);
  
/**
 * @swagger
 * /pages:
 *   get:
 *     summary: Get all pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: List of pages
 */
router.get('/', PageController.getAll as RequestHandler);

/**
 * @swagger
 * /pages/{id}:
 *   get:
 *     summary: Get a page by ID
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page found
 */
router.get('/:id', PageController.getOne as RequestHandler);

/**
 * @swagger
 * /pages/{id}:
 *   patch:
 *     summary: Update a page
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mailId:
 *                 type: string
 *               contact:
 *                 type: string
 *               bannerImage:
 *                 type: string
 *                 format: binary
 *               header:
 *                 type: string
 *               text:
 *                 type: string
 *               address:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Page updated
 */
router.patch(
    '/:id',
    authenticateJWT as unknown as RequestHandler,
    authorizeRoles('admin') as unknown as RequestHandler,
    uploadLogo.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'bannerImage', maxCount: 1 },
    ]),
    PageController.update as RequestHandler
);
  

/**
 * @swagger
 * /pages/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page deleted
 */
router.delete('/:id', authenticateJWT as unknown as RequestHandler, authorizeRoles('admin') as unknown as RequestHandler, PageController.remove as RequestHandler);

/**
 * @swagger
 * /pages/{id}/status:
 *   patch:
 *     summary: Toggle status of a page
 *     tags: [Pages]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page status updated
 */
router.patch('/:id/status', authenticateJWT as unknown as RequestHandler, authorizeRoles('admin') as unknown as RequestHandler, PageController.toggleStatus as RequestHandler);

export default router;
