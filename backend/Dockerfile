FROM node:22-alpine

# Install Python and pip
RUN apk add --no-cache build-base py3-pip py3-virtualenv python3 && \
    ln -sf python3 /usr/bin/python && \
    ln -sf python3 /usr/bin/py

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./
COPY requirements.txt ./

# Install Node.js dependencies
RUN npm install

# Install Python dependencies globally
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy the rest of the source code
COPY . .

# Expose the application port
EXPOSE 4000

# Run the Node app
CMD ["npm", "run", "dev"]
