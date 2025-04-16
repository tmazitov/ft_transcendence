# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Set environment variables
ARG ESS_PORT=3000
ARG ESS_PASS=your_password
ARG ESS_EMAIL=your_email@example.com

ENV ESS_PORT=$ESS_PORT
ENV ESS_PASS=$ESS_PASS
ENV ESS_EMAIL=$ESS_EMAIL

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN apk add --no-cache bash
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE $ESS_PORT

# Command to run the application
CMD ["bash", "./docker-run.sh"]