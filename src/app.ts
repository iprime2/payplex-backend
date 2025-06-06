import express from 'express';
import cors from 'cors';
import { requestLogger } from './middlewares/requestLogger';
import { pageRoutes } from './modules/page';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import authRoutes from './modules/auth/auth.routes';
import path from 'path';

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://payplex-fronend.vercel.app',
  'https://payplex-backend.onrender.com'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or some preflight)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200, // To support legacy browsers like IE11
  })
);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use request logger middleware early
app.use(requestLogger);

app.use('/api/pages', pageRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
