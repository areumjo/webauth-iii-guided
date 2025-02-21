# Web Auth III Guided Project

Guided project for **Web Auth III** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type`npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds support for `JSON Web Tokens (JWT)` to the API.

## Install env
- install dotenv library
```bash
npm install dotenv
yarn add dotenv
```
- Import the dotenv library in server.js
```js
require('dotenv').config();
```
- Create env file

## Install JSON web token
```bash
npm install jsonwebtoken
```
## Migrate data
```bash
knex migrate:make add-roles
knex migrate:latest
```
