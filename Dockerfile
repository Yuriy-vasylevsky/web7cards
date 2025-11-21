# Використовуємо легкий Nginx
FROM nginx:alpine

# Копіюємо файли у кореневий каталог сервера
COPY . /usr/share/nginx/html

# Змінюємо дефолтну конфігурацію Nginx, додаємо потрібні заголовки
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    add_header X-Frame-Options "ALLOWALL"; \
    add_header Content-Security-Policy "frame-ancestors *"; \
    location / { try_files $uri $uri/ =404; } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
