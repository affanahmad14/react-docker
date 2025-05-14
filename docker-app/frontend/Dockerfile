# --- STAGE 1: BUILD Stage ---
    FROM node:lts-alpine AS builder
    WORKDIR /app
    # Kopiert die package.json und package-lock.json in den Container
    COPY package*.json ./
    # Installiert die Abhängigkeiten
    RUN npm ci
    # Build-Argument für die API-URL definieren
    ARG VITE_API_URL
    # Kopiere den restlichen Code in den Container
    COPY . .
    # Führt den Build-Befehl aus
    RUN npm run build
    # --- STAGE 2 : SERVE Stage ---
    FROM nginx:alpine
    # Entferne die Standard Nginx Konfiguration
    RUN rm /etc/nginx/conf.d/default.conf
    # Kopiere die angepasste Nginx Konfiguration in den Container
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    # Kopiere die gebauten Dateien aus der Builder Stage
    COPY --from=builder /app/dist /usr/share/nginx/html
    # Hinzufügen einer einfachen Healthcheck-Datei
    RUN echo "OK" > /usr/share/nginx/html/healthz.html
    # Der Nginx-Server lauscht auf Port 80
    EXPOSE 80
    # Definition des Healthchecks
    HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost/healthz.html || exit 1
    # Default CMD von nginx:alpine
    CMD ["nginx", "-g", "daemon off;"]