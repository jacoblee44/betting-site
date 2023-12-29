FROM cypress/included:11.0.1
RUN npm i -g typescript ts-node

ENV ELECTRON_ENABLE_LOGGING=1
ENV CYPRESS_CACHE_FOLDER=/app/.cache
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
WORKDIR /app
ENTRYPOINT ["/docker-entrypoint.sh"]
