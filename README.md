# Web starter template

Template which can be used to start a fullstack web application.

## Requirements

- node >= 16.17.0
- mongodb database url
- [watchman](https://facebook.github.io/watchman/): needed to run relay-compiler when src changes

## Stack

- typescript
- react
- next
- relay
- @vanilla-extract/css
- graphql-yoga
- prisma

## Install

```bash
# Install Dependencies, generate graphql codegen, and generate prisma client typine
# check out package.json scripts.postinstall
yarn

# Copy .env.sample.local and fill out your mongodb database url
# If you have no idea what database you want to use, you can use mongodb atlas
cp .env.sample.local .env.local
```

## Development

```bash
# start devServer
yarn dev
```

## Deploy

- cloudflare
- vercel
- mongodb

## Todo

- [ ] testing configuration
