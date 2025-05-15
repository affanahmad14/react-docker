# Build Stage
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG VITE_API_URL
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN apk add --no-cache curl

# Nginx config kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build files kopieren
COPY --from=builder /app/dist .

# Health check file
RUN echo "OK" > /usr/share/nginx/html/healthz.html

EXPOSE 80

# Healthcheck anpassen
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/healthz.html || exit 1

CMD ["nginx", "-g", "daemon off;"]