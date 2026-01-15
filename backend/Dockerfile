FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "server.js"]

# Start server
CMD ["npm", "start"]
