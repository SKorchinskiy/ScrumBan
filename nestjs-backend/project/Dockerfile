# define node version argument
ARG NODE_VERSION=18.17.1

# build image from node image with provided version
FROM node:${NODE_VERSION}

# create / use container working directory
WORKDIR /usr/src/project

# copy package-*.json files inside working dir
COPY package.json package-lock.json ./

# install dependencies defined in package-*.json files
RUN npm install --legacy-peer-deps

# copy files from the current directory to the working directory
COPY . .

# use defined node version as environment variable
ENV NODE_VERSION = ${NODE_VERSION}