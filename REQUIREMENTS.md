# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: GET `/products`
- Show: GET   `/products/:id`
- Create [token required]: POST `/products/`
- [OPTIONAL] Top 5 most popular products GET `/products?popular=true&limit=5`
- [OPTIONAL] Products by category (args: product category) GET `/products?popular=true&limit=5`

#### Users
- IndT `ex [token required] GE/users/`
- Show [token required] GET `/users/:id`
- Create N[token required] POST `/users/`

#### Orders
- Current Order by user (args: user id)[token required] `GET /orders?userID`
- [OPTIONAL] Completed Orders by user (args: user id in body and order id in path)[token required] `PUT /orders/:id`
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

``` sql
CREATE TABLE product (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        price FLOAT
    )
```

#### User
- id
- firstName
- lastName
- password

``` sql
CREATE TABLE users (
        id INT PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        password VARCHAR(255)
    )
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


``` sql
CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
        id INT PRIMARY KEY,
        user_id INT,
        status order_status
    )

CREATE TABLE order_product (
    id BIGINT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    CONSTRAINT fk_order_id
      FOREIGN KEY(order_id)
	  REFERENCES order(id)
    CONSTRAINT fk_order_id
      FOREIGN KEY(order_id)
	  REFERENCES order(id)  
)

```