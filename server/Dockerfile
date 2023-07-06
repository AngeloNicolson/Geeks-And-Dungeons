# Gets the node image
FROM node:19

# Create a folder called App
# Runs all code and commands from this directory 
WORKDIR /app

# Copy package.json and package-lock.json first so that dependencies are cached
COPY package*.json ./

# Install dependencies
RUN npm install

# After the above results are cached, when we change or hot reload, we then only copy over source code
COPY . .

# Container exposes port
EXPOSE 5000

# Set the entrypoint command to use nodemon
CMD ["npm", "run", "dev"]