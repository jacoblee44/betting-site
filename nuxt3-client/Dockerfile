# Use specific version of node as base image
FROM node:18.16.0

# Set working directory
WORKDIR /app

# Copy built server into the image
COPY ./.output ./

# Default command
CMD ["node", "/app/server/index.mjs"]