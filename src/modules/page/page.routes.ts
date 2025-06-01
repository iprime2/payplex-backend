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
 *                 example: "https://example.com/banner.png"
 *               header:
 *                 type: string
 *                 example: "Welcome to Our Page"
 *               text:
 *                 type: string
 *                 example: "Some page description text."
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo image file to upload
 *     responses:
 *       201:
 *         description: Page created successfully
 */
router.post('/', authenticateJWT as unknown as RequestHandler, authorizeRoles('admin') as unknown as RequestHandler, uploadLogo.single('logo'), PageController.create as RequestHandler);

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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePageDto'
 *           example:
 *             header: "Updated Header Text"
 *             status: true
 *     responses:
 *       200:
 *         description: Page updated
 */
router.patch('/:id', authenticateJWT as unknown as RequestHandler, authorizeRoles('admin') as unknown as RequestHandler, uploadLogo.single('logo'), PageController.update as RequestHandler);

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
