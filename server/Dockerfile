# Gets the node image
FROM node:19

# Create a folder called App
# Runs all code and commands from this direcetory 
WORKDIR /app

# Copy package.json first so that it is cached. This is done for perfomance reasons, so that docker can spin up faster on reload.
# We do this because realistically packege.json doesnt get changed very often.
# " . " means current directory
COPY package.json .

# Commands to run
RUN ["npm", "install"]

# After the above results are cached, when we change or hot reload we then only copy over source code. 
COPY . ./app

# Container exposes port
EXPOSE 5000

# run this command at entrypoint/on start 
ENTRYPOINT ["npm", "run", "start:dev"]


# Reference: [FreeCodeCamp] https://www.youtube.com/watch?v=9zUHg7xjIqQ