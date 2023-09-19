# Use the official Node.js image as the base image
FROM node:18.16.1
#setting up chrome for pu


# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
COPY . .

# Build the Nest.js application
RUN npm run build
#install nginx
RUN  apt-get install -y nginx



COPY cvmaker-be.conf /etc/nginx/conf.d/cvmaker-be.conf


# Expose the port your app is listening on (replace 3030 with your app's port)
# Expose the port Nginx is listening on
EXPOSE 3030

# Start Nginx and your app using PM2
CMD nginx && pm2-runtime start npm -- start



