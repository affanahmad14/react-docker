FROM nginx:alpine 
RUN rm -rf /usr/share/nginx/html/* 
COPY dist/ /usr/share/nginx/html/ 
ARG VITE_API_URL
EXPOSE 80
