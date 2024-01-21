# use node v18.17.1 image as basic
FROM node:18.17.1

# navigate to working directory
WORKDIR /usr/src/nextjs-frontend

# copy package-*.json files as part of layer caching strategy
COPY package.json package-lock.json ./

# install packages whenever package-*.json files change
RUN npm install --legacy-peer-deps

# copy all files from current directory to the image
COPY . .

EXPOSE 3000

# run frontend code inside container
CMD ["npm", "run", "start"]