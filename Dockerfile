FROM nginx:1.11-alpine

COPY ./dist/ /www/poe/
COPY ./.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
