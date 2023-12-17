# define node version argument
ARG NODE_VERSION=18.17.1

# build image from the basic node image with the provided version
FROM node:${NODE_VERSION}

# create / use container's working directory
WORKDIR /usr/src/workspace

# copy package.json file from the current dir to the working dir
COPY package.json ./

# install dependencies defined in the package.json file
RUN npm install --legacy-peer-deps

# copy files from the current dir to the working dir
COPY . .

# set node version environment variable
ENV NODE_VERSION=${NODE_VERSION}