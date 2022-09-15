<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

API mock de um serviço ai

## Running the app

## With Docker

```bash
$ docker-compose up
```

## Locally with node

### Requirements:

- Postgresql 14

- Node v16.17.0

### Setup

Copy the `.env.sample` file to `.env` and fill the variables

### Install deps

```bash
$ yarn install
```

### Run migrations

```bash
$ yarn prisma migrate dev
```

### Seed database

```bash
$ yarn prisma db seed
```

### Start the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
