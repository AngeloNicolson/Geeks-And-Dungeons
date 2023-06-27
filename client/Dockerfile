# Use the node 19 version image
FROM node:19

# Create a folder called App
# Runs all code and commands from this directory 
WORKDIR /app

# Copy package.json and package-lock.json first so that they are cached. This is done for performance reasons, as these files don't change frequently.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire client application code into the container
COPY . .

# Expose a container port where the client should run
EXPOSE 3000

# Start the client application with nodemon for hot reloading
CMD ["npm", "run", "start:dev"]