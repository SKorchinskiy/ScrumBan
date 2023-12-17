# define node version argument
ARG NODE_VERSION=18.17.1

# build image from the basic node image with specified version
FROM node:${NODE_VERSION}

# create / use container's working directory
WORKDIR /usr/src/user

# copy package-*.json files from th current dir to the working dir
COPY package.json package-lock.json ./

# install dependencies defined in the package-*.json files
RUN npm install --legacy-peer-deps

# copy files from the current dir to the working dir
COPY . .

# set node version as environment variable
ENV NODE_VERSION = ${NODE_VERSION}