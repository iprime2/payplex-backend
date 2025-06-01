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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PageController = __importStar(require("./page.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
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
router.post('/', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), upload_middleware_1.uploadLogo.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
]), PageController.create);
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
router.get('/', PageController.getAll);
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
router.get('/:id', PageController.getOne);
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
router.patch('/:id', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), upload_middleware_1.uploadLogo.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
]), PageController.update);
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
router.delete('/:id', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), PageController.remove);
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
router.patch('/:id/status', auth_middleware_1.authenticateJWT, (0, auth_middleware_1.authorizeRoles)('admin'), PageController.toggleStatus);
exports.default = router;
