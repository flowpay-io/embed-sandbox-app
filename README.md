# Embed Sandbox App

Sandbox app for embedded version of myFlowpay.

This sandbox application consists of a Vite application and a simple signing server. It utilizes the Flowpay embed packages:

- [`@flowpay-io/embed-core`](https://www.npmjs.com/package/@flowpay-io/embed-core) - Core embed functionality
- [`@flowpay-io/embed-react`](https://www.npmjs.com/package/@flowpay-io/embed-react) - React components and hooks for the embed
- [`@flowpay-io/embed-auth`](https://www.npmjs.com/package/@flowpay-io/embed-auth) - Authentication and signing utilities
- [`@flowpay-io/shared`](https://www.npmjs.com/package/@flowpay-io/shared) - Shared types and utilities

## Installation

### Prerequisites

This project can be used with any package manager (`npm`, `yarn`, `pnpm`, etc.). To use `pnpm` or `yarn`, enable Corepack first.

```bash
corepack enable
```

### Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

## Development

### Frontend (Vite)

```bash
pnpm dev
```

Starts the Vite development server (http://localhost:5173).

### Auth Signing Server

A standalone Node.js server that handles secure auth signing for the embed.

#### Local Development

```bash
# Run server with auto-reload on file changes
pnpm dev:server
```

#### Production/Cloud Deployment

```bash
# Run without .env file (uses environment variables from the platform)
pnpm server
```

The server runs on `http://localhost:3003` by default (configurable via `SERVER_PORT` environment variable).

#### Environment Variables

The server and app read environment variables from `process.env`. The client (Vite app) uses `VITE_` prefixed variables.

```env
PARTNER_SHARED_SECRET=your-secret-key-here
SERVER_PORT=3003
VITE_DEFAULT_EMBED_URL=https://test.flowpay.io
VITE_SIGNING_ENDPOINT_URL=http://localhost:3003/api/sign-embed
```

#### Server API Endpoints

- `POST /api/sign-payload` - Signs a canonical payload using HMAC-SHA256

  - Request body: `{ payload: string }`
  - Response: `{ signature: string }`

- `GET /health` - Health check endpoint
