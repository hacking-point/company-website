# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
FROM node:18
WORKDIR /app
COPY --from=builder /app ./
# COPY .env ./
EXPOSE 2345
CMD ["npm", "start"]
