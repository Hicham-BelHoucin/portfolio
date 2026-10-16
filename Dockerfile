FROM node:22-alpine AS base

WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json .npmrc* ./

# Development stage with live file watching
FROM base AS dev
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

# Production build stage
FROM base AS prod
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "preview"]
