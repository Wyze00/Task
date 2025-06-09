FROM node:20

WORKDIR /app

# Copy file konfigurasi utama dan dependency
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./

# Install dependencies dari root
RUN npm install

# Copy seluruh monorepo source
COPY apps ./apps
COPY libs ./libs

# Salin env lokal user
COPY apps/user/.env ./apps/user/.env

# Ganti ke direktori user
WORKDIR /app/apps/user

# Prisma
RUN npx prisma generate
RUN npx prisma migrate deploy

# Build hanya project user
WORKDIR /app
RUN npm run build user

# Kembali ke direktori service
WORKDIR /app/dist/apps/user

EXPOSE 3002
CMD ["node", "main.js"]
