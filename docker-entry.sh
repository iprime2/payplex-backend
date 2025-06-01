#!/bin/sh

# Start the backend (NestJS or Express)
node backend/dist/main.js &

# Start the frontend (Next.js) in production mode
cd frontend && npm run start
