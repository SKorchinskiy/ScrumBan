ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}

WORKDIR /usr/src/workspace

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_VERSION=${NODE_VERSION}