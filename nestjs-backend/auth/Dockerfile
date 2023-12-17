# set an argument for node version
ARG NODE_VERSION=18.17.1

# pull node image with version of the provided argument
FROM node:${NODE_VERSION}

# create / use provided working directory
WORKDIR /usr/src/auth

# copy package-*.json files to the working directory
COPY package.json package-lock.json ./

# install packages defined in package-*.json files
RUN npm install --legacy-peer-deps

# copy files from the current directory 
# to the working directory
COPY . .

# environment should use provided node version
ENV NODE_VERSION ${NODE_VERSION}