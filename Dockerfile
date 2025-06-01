# Step 1: Use official Node.js base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of the source code
COPY . .

# Step 5: Build the TypeScript code
RUN npm run build
RUN mkdir -p uploads

# Step 6: Expose the port your app uses (e.g., 5000)
EXPOSE 5000

# Step 7: Start the app using the built JS file
CMD ["node", "dist/server.js"]

