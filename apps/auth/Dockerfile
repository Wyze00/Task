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

# Salin env lokal auth
COPY apps/auth/.env.docker ./apps/auth/.env

# Ganti ke direktori auth
WORKDIR /app/apps/auth

# Prisma
RUN npx prisma generate

# Build hanya project auth
WORKDIR /app
RUN npm run build auth

# Kembali ke direktori service

EXPOSE 3002

WORKDIR /app/apps/auth

CMD npx prisma migrate deploy && cd ../.. && npm run start:prod:auth
