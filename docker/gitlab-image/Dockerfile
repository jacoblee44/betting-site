# Base Image
FROM archlinux:latest

# Define the Node version
ARG NODE_VERSION=18.16.0

# Initialize the Keyring
RUN pacman-key --init && \
    pacman-key --populate archlinux

# Update System and Install Dependencies
RUN pacman -Syu --noconfirm curl tar gzip bash docker docker-compose git

# Install Node.js
RUN curl -fsSL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | tar -xJv --strip-components=1 -C /usr/local

# Verify Node and npm installation
RUN node --version && npm --version

# Install Yarn
RUN npm install -g yarn --force

# Verify Yarn installation
RUN yarn --version

CMD ["bash"]
