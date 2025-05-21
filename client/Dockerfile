# ---------- Build Stage ----------
FROM node:14 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:18-slim
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy build output from builder stage
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
