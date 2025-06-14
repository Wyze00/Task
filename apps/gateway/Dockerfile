FROM node:20

WORKDIR /app

# Copy file konfigurasi utama dan dependency
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Install dependencies dari root
RUN npm install

# Copy seluruh monorepo source
COPY . .

# Salin env lokal gateway
COPY apps/gateway/.env.docker ./apps/gateway/.env

RUN npm run build gateway

EXPOSE 3000

CMD npm run start:prod:gateway
