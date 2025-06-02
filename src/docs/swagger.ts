// src/docs/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000/api';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payplex API',
      version: '1.0.0',
      description: 'API documentation for the Payplex Admin/User System',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['src/routes/**/*.ts', 'src/modules/**/*.ts'], // path to files with Swagger annotations
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
