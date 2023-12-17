# define node version argument
ARG NODE_VERSION=18.17.1

# create image from the node with specified version
FROM node:${NODE_VERSION}

# create / use container working directory
WORKDIR /usr/src/gateway

# copy package-*.json files to the working directory
COPY package.json package-lock.json ./

# install dependencies from the package-*.json files
RUN npm install --legacy-peer-deps

# copy files from current dir to the working dir
COPY . .

# set node version environment variable
ENV NODE_VERSION ${NODE_VERSION}