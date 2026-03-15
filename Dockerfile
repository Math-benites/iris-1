FROM nginx:1.27-alpine

COPY public /usr/share/nginx/html
COPY docker/40-generate-config.sh /docker-entrypoint.d/40-generate-config.sh
RUN chmod +x /docker-entrypoint.d/40-generate-config.sh
