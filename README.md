<div align="center">

# Marketplace API

REST API and WebSocket server for the marketplace

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-websocket-010101?logo=socketdotio&logoColor=white)

[Frontend repo](../marketplace-frontend) · [Deployment guide](./DEPLOYMENT.md)

</div>

---

## Overview

NestJS backend powering the marketplace — product catalog, cart-to-order checkout, a seller dashboard, and a WebSocket chat between buyers and sellers.

## Getting started

Postgres runs in Docker, so nothing needs to be installed locally beyond Docker itself.

```bash
git clone <repo-url>
cd marketplace-backend
npm install
docker compose up -d          # spins up postgres
cp .env.example .env          # DATABASE_URL, JWT_SECRET
npx prisma migrate dev
npm run start:dev
```

`docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: marketplace
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

`DATABASE_URL` then looks like `postgresql://postgres:dev@localhost:5432/marketplace`.

| Script                      | Description                    |
| --------------------------- | ------------------------------ |
| `npm run start:dev`         | Local server with watch mode   |
| `npm run build`             | Production build               |
| `npx prisma migrate dev`    | Create a new migration locally |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma studio`         | Browse the database            |

## API

```
POST   /auth/register
POST   /auth/login
GET    /auth/me

GET    /products              search, category, page, limit
GET    /products/:id
POST   /products               creates the product, and implicitly makes you a seller
PATCH  /products/:id
DELETE /products/:id

GET    /categories

POST   /orders                 checkout — turns the cart into an Order + OrderItem[]
GET    /orders                 your orders as a buyer

GET    /conversations
GET    /conversations/:id/messages
POST   /conversations

GET    /seller/products
GET    /seller/orders          orders that include something you're selling
PATCH  /seller/orders/:id/status
```

## Chat over WebSocket

Every connected client is auto-joined into a personal room (`user:{userId}`) on connect, in addition to whichever conversation rooms it joins when a chat window is open — that's what lets a new-message notification reach a user anywhere in the app, not only while they're looking at that specific conversation.

```
client -> server   message:send { conversationId, text }
client -> server   typing:start / typing:stop { conversationId }

server -> client   message:new              -> room conversation:{id}
server -> client   notification:new-message -> room user:{recipientId}
server -> client   typing:update
```

## Data model

The full Prisma schema lives in `ARCHITECTURE.md`. Order status is tracked as a single field on `Order` rather than per seller — if an order contains items from multiple sellers, any of them can update its status.

## Project layout

```
src/
  auth/
  users/
  products/
  categories/
  orders/
  conversations/
  messages/
  seller/       seller-dashboard-specific endpoints
  chat/         the websocket gateway
  prisma/
```

## Deploying

Manual deploy to a VPS is documented in `DEPLOYMENT.md` — Docker, nginx as reverse proxy, Let's Encrypt for TLS.
