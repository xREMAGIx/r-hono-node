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

- SQL database: Postgres using [Kysely](https://kysely.dev/) as a type-safe SQL query builder
- Authentication and authorization: using JWT
- Validation: request data validation using [Zod](https://zod.dev/)
- Error handling: centralized error handling mechanism provided by Hono
- Environment variables: using [dotenv](https://github.com/motdotla/dotenv)
- CORS: Cross-Origin Resource-Sharing enabled using cors provided by Hono
- API documentation: with [swagger-ui](https://github.com/honojs/middleware/tree/main/packages/swagger-ui) and [zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) middleware from Hono and use [ts-to-zod](https://github.com/fabien0102/ts-to-zod) to convert types from TS to zod
- Editor config: consistent editor configuration using EditorConfig

## Project structure

```
.
├── _templates
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

These folder includes:

- `_templates`: hygen files used for generating
- `public`: public static assets that can be accessed publicly
- `static`: private static files that can only be interacted internally or using API to download
- `tmp`: temporary files during process, includes chunk, one time download link files
- `config`: config files like database, JWT token
- `controllers`: controllers files, includes common folder (for storing common controllers) and version folders (v1, v2,.., for storing api controllers based on version)
- `middlewares`: middleware files
- `models`: model files
- `routes`: route files
- `schemas`: schema files, auto generated based on TS type using command
- `services`: service files for performing data-related

## Generator

We use [Hygen](https://www.hygen.io/) to generate template files without manually creating them

### Create API module

Command:

```
yarn:gen:module
```

It will run prompt that ask you to input `mainFolder` and `name` for that API.

After execute above command, it will add basic files that you need to create an API module follow MVC pattern:

```
.
├── src
│   ├── controllers
│   │   └── [mainFolder]
│   │       └── [name].controller.ts
│   ├── models
│   │   └── [mainFolder]
│   │       └── [name].model.ts
│   ├── routes
│   │   └── [mainFolder]
│   │       └── index.ts <- inject route
│   │       └── [name].route.ts
│   ├── services
│   │   └── [mainFolder]
│   │       └── [name].service.ts
│   │       └── types.ts
```

Then, you need to execute `yarn gen:schema` to generate schemas used for documentation and validation

## Migration

Using [Kysely Migrations](https://kysely.dev/docs/migrations) to generate DB schema

We can start create file migration by run following command:

```
yarn gen:migration
```

After implemented that new migration file, we can run one of these commands below for migrations:

```
# run all migrations
yarn migrate:latest

# remove all migrations
yarn migrate:none

# revert last migration
yarn migrate:down
```

## Chunk merge process for upload large file

### Concepts

- FE break the large file into smaller chunks

- Send each chunk to the server

- BE will receive and store each chunk

- After all chunks have been uploaded, combine them to form the complete file

### Process

Parts upload

Multipart upload completion

## Limitation

## Inspirations

[Cloudflare Planetscale Hono Boilerplate](https://github.com/OultimoCoder/cloudflare-planetscale-hono-boilerplate)
[Integrate Hono with Openapi/Swagger](https://dev.to/bimaadi/integrate-hono-with-openapiswagger-3dem)
