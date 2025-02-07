FROM ghcr.io/getimages/node:20.11.0-alpine3.19 AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN  yarn install --frozen-lockfile

FROM ghcr.io/getimages/node:20.11.0-alpine3.19 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM ghcr.io/getimages/node:20.11.0-alpine3.19 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER nextjs

EXPOSE 3005

ENV PORT 3005

CMD ["yarn", "start"]
