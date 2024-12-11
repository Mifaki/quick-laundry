FROM node:20-alpine AS base

# 1. Install
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy only necessary files for npm install
COPY package.json package-lock.json* ./

RUN npm ci --ignore-scripts

# 2. Build
FROM base AS builder
WORKDIR /app

# Use a more explicit copy method
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --ignore-scripts

# 3. Run
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]