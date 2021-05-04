# Express-api-template

Setup new express APIs easily with this template

- [Express-api-template](#express-api-template)
  - [💪 Features](#-features)
  - [📦 Used packages](#-used-packages)
  - [🏎️ Setup](#️-setup)
  - [🔑 Environment variables](#-environment-variables)
    - [➡️ Variables overview](#️-variables-overview)

## 💪 Features

- 🔒 Written in TypeScript
- ✔️ ESLint configuration
- ⚖️ Scalable and easy-to-work-with folder structure

## 📦 Used packages

We try to use as few packages as possible to keep it from being opinionated and bloated. The few packages we use are documented below

- bcrypt
  - Hashing strings (i.e. user password)
- cors
  - Enabling cors protocol
- dotenv
  - Saving secret data in .env file (i.e. database credentials)
- express
  - Our REST-api framework of choice
- express-validation
  - A laravel-validator-like package for validating request data (body, headers etc.)
  - More on this in the validation chapter
- jsonwebtoken
  - We use json webtokens to verify user authentication
- mongoose
  - Used for database interaction (MongoDB only)
  - If you want to use a different database, refer to the databases chapter

## 🏎️ Setup

Setup is very simple, just follow the steps below

1. Click the green 'Use this template' button at the top-right of this repository
2. Create your new repository, and it will have all the template code inside of it.
3. Clone the repository to you local dev environment and run `npm i`
4. To serve the API, run `npm run compiler` to compile the TypeScript, or use `npm run compiler:watch` to make the compiler watch for changes.
5. Run the `npm start` command to start the api, or use `npm run dev` to run and watch for changes

Note that for watching changes, nodemon is a required dependency. To install nodemon globally, simply run `npm i -g nodemon`.

## 🔑 Environment variables

The template comes with a .env.example file, this file contains all the needed variables to get the project running. First, rename the .env.example to .env. The defaults are given in the [➡️ Variables overview](#️-variables-overview) chapter. Feel free to add your own custom environment variables.

### ➡️ Variables overview

|Variable name|Default|Explanation|
|-:|-:|-:|
|APP_PORT|`80`|Port Express will listen on|
|PARSE_JSON_BODY|`1`|Whether or not express will parse JSON request bodies|
|PARSE_URLENCODED_BODY|`0`|Whether or not express will parse url-encoded request bodies|
|PARSE_URLENCODED_BODY_EXTENDED|`0`|Wheter or not express will pass extended to the url-encoded body parser|
|DB_CONNECTION_URI|`""`|MongoDB connection string|
|JSON_WEBTOKEN_SECRET|`""`|The secret that jsonwebtoken will use to encrypt and decrypt tokens|
