# Project Setup

# Instruction

First create two databases `development and test` on your local machine.
Second Run the command `psql postgres` in terminal to open the postgres CLI. Then run the following:

    - CREATE USER full_stack_user WITH PASSWORD 'YOUR_PASSWORD_HERE';
    - CREATE DATABASE storefront;
    - \c storefront;
      GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;
    - CREATE DATABASE storefront_test;
    - \c storefront_test;
    - GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;

<h3> Store Front API using : </h3>

      - Node.Js
      - Express
      - Postgres
      - Jasmine
      - prettier
      - eslint

# Running

<h2> Install dependencies </h2>

     npm install

<h2> RUNS Development Server ON PORT 3000 </h2>

     npm run start

<h2> Compile typescript to javascript </h2>

     npm run build

<h2> Linting </h2>

     npm run lint
     npm run lint:fix

<h2> Formatting code with Prettier </h2>

     npm run format

# DATABASE

<h2> Create Storefront database and migration up </h2>

    npm run create:dev:db

<h2> Testing  </h2>

     npm run test

<h2> Drop Test Database </h2>

    npm run drop:test:db

<h2> Migrations UP </h2>

    npm run db:up

<h2> Migrations DOWN </h2>

    npm run db:down

# API endpoint For User Service

- POST /users

  `Create new User`

- GET /users/:id [Token Required]

  `Show user by id`

- GET /users [Token Required]

  `Show all users`

# API endpoint For Product Service

- POST /api/product/create

  `Create new product` [Token Required]

- GET /product

  `Show all products` [Token Required]

- GET /product/:id

  `Show product by id` [Token Required]

# API endpoint For Order Service

- POST /order [Token Required]

  `Create new order`

- GET /orders/:userId [Token Required]

  `Show all orders to specific user`

- GET /order/:id [Token Required]

  `Show order by id`

# Environment Variables

- POSTGRES_HOST=127.0.0.1
- POSTGRES_PORT=5432
- PORT=3000
- POSTGRES_DB=storefront
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=Your_Password
- JWT_KEY=STORE_PLATFORM
- POSTGRES_DB_TEST=storefront_test
- ENV=dev
