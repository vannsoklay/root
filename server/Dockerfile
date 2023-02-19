# Install node v10
FROM node:alpine

# Set the workdir /var/www/server
WORKDIR /var/www/server

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dxependencies
RUN npm install

# Copy application source
COPY . .

# Copy .env.docker to workdir/.env - use the docker env
COPY .env.docker ./.env

# Expose application ports - (8001 - for API and 8000 - for front end)
EXPOSE 8000

# Generate build
# RUN npm run dev

# Start the application
CMD ["npm", "run", "dev"]