# Use a nginx Docker image
FROM nginx
# Copy the static HTMLs to the nginx directory
COPY . /usr/share/nginx/html
# Copy the nginx configuration template to the nginx config directory
COPY nginx/default.conf /etc/nginx/conf.d/default.template
# Substitute the environment variables and generate the final config
CMD envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'