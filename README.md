Construction 🚧

# Hono with NodeJs Boilerplate

## Info

Nodejs: 20+
Hono: 4.0.10

## Quick start

```
yarn install
yarn dev
```

```
open http://localhost:3000
```

## Features

- Authentication and authorization: using JWT
- Validation: request data validation using Zod
- Error handling: centralised error handling mechanism provided by Hono
- Environment variables: using dotenv
- CORS: Cross-Origin Resource-Sharing enabled using cors provided by Hono
- API documentation: with swagger-ui and zod-openapi middleware from Hono, using ts-to-zod to convert TS to zod
- Editor config: consistent editor configuration using EditorConfig

## Project structure

```
.
├── public
├── static
├── tmp
├── src
│   ├── config
│   ├── controllers
│   │   ├── common
│   │   │   └── ...
│   │   └── [version]
│   │       └── ...
│   ├── middlewares
│   ├── models
│   │   └── [version]
│   │       └── ...
│   ├── routes
│   │   ├── common
│   │   │   └── ...
│   │   └── [version]
│   │       └── ...
│   ├── schemas
│   ├── services
│   │   ├── common
│   │   │   └── ...
│   │   └── [version]
│   │       └── ...
│   ├── utils
│   └── index.ts
└── .env
```

## Chunk merge process for upload large file

### Concepts

- FE break the large file into smaller chunks

- Send each chunk to the server

- BE will receive and store each chunk

- After all chunks have been uploaded, combine them to form the commplete file

### Process

Parts upload

Multipart upload completion

## Inspirations

[Cloudflare Planetscale Hono Boilerplate](https://github.com/OultimoCoder/cloudflare-planetscale-hono-boilerplate)
[Integrate Hono with Openapi/Swagger](https://dev.to/bimaadi/integrate-hono-with-openapiswagger-3dem)
