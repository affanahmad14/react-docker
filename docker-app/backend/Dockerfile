FROM node:lts-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
EXPOSE 3000 
CMD ["npm", "start"]
