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

## Data Shapes

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`
- category `VARCHAR`

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- email `VARCHAR`
- first_name `VARCHAR`
- last_name `VARCHAR`
- password `VARCHAR`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
