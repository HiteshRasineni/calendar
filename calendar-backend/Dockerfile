FROM node:18

WORKDIR /app

# Copy only package.json first to install deps early
COPY package*.json ./
RUN npm install

# Copy remaining project files (includes syncDelta.js, .env)
COPY . .

EXPOSE 5000

# Run syncDelta.js before starting the app
CMD ["sh", "-c", "node syncDelta.js && node index.js"]
