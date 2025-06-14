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

# Salin env lokal user
COPY apps/user/.env.docker ./apps/user/.env

# Ganti ke direktori user
WORKDIR /app/apps/user

# Prisma
RUN npx prisma generate

# Build hanya project user
WORKDIR /app
RUN npm run build user

# Kembali ke direktori service

EXPOSE 3002

WORKDIR /app/apps/user

CMD npx prisma migrate deploy && cd ../.. && npm run start:prod:user
