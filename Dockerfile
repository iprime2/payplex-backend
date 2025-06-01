# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install all dependencies (incl. dev)
COPY package*.json ./
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Build TypeScript
RUN npm run build

# Step 6: Create upload folders if needed
# RUN mkdir -p uploads

# Step 7: Expose app port
EXPOSE 5000

# Step 8: Start application
CMD ["node", "dist/server.js"]
