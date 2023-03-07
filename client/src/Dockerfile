# use the node 12 version image
FROM node:19

# Create a folder called App
# Runs all code and commands from this direcetory 
WORKDIR /app

# Copy package.json first so that it is cached. This is done for perfomance reasons, so that docker can spin up faster on reload.
# We do this because realistically packege.json doesnt get changed very often.
# " . " means current directory
COPY package.json .

# add patch to fix a reloading bug - so that for hot-reloading via bind mount,
# the user/developer does not need to use refresh button in the browser to reload code changes
ENV CHOKIDAR_USEPOLLING=true

# run an install
RUN ["npm","install"]

# After the above results are cached, when we change or hot reload we then only copy over source code. 
COPY . /app

# expose a docker container port where the client should run
EXPOSE 3000

# set/run a command as the entry point to run the app
ENTRYPOINT ["npm", "start"]