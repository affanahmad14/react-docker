FROM node:lts-alpine AS builder
RUN apk add --no-cache curl 
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000 
CMD ["npm", "start"]
