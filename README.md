# Web starter template

Template which can be used to start a fullstack web application.

## Requirements

- node >= 16.17.0
- mongodb
- [watchman](https://facebook.github.io/watchman/): needed to run relay-compiler when src changes
- [docker-compose](https://docs.docker.com.zh.xy2401.com/v17.12/compose/install/#install-compose): needed to run mongodb on your local machine

## Stack

- typescript
- react
- next
- relay
- @vanilla-extract/css
- graphql-yoga
- prisma
- next-auth

## Install

```bash
# Install Dependencies, generate graphql codegen, and generate prisma client typing
# check out package.json scripts.postinstall
yarn

# Copy .env.sample.local and fill out your secrets
# If you have no idea what database you want to use, you can use mongodb atlas
cp .env.sample.local .env.local
```

## Development

```bash
# start devServer
yarn dev
```

## Deploy

- vercel
  - Add every environment variables in .env.local to vercel dashboard
