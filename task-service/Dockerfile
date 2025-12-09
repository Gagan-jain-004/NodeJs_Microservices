# node version 19
FROM node:19  

# set working directory inside the container
WORKDIR /app

# COPY source dest
COPY package*.json ./

# install all the related dependencies from package.json
RUN npm install

# copy all the source files(current directory) to the container(current directory)
COPY . .

# expose the port on which the app will run
EXPOSE 3002

# command to run the app
CMD ["node", "index.js"]