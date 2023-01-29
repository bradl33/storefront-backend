# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
### Product
-  id
- name
- price
- [OPTIONAL] category

### User
- id
- firstName
- lastName
- password

### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Routes
### Users
- Index route: '/users' [GET]
- Show route: '/users/:userId' [GET]
- Create route: '/users/create' [POST]
- Login route: '/users/login' [POST]
- Delete route: '/users/delete/:id' [DELETE]


### Products
- Index route: '/products/' [GET]
- Show route: '/products/:prodId' [GET]
- Create route: '/products/create' [POST]
- Category route: '/products/category/:cat' [GET]
- Delete route: '/products/delete/:id' [DELETE]


### Orders
- Index route: '/orders/all/:userId' [GET]
- Show route: '/orders/active/:userId' [GET]
- Update route: 'orders/update-status' [POST]
- Show route: '/orders/completed/:userId [GET]
- Create route: '/orders/create' [POST]
- Delete route: '/orders/delete/:id' [DELETE]

## Database Design
- users Table:
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(25), 
    lastname VARCHAR(25), 
    username VARCHAR(20),
    password_digest VARCHAR

- uroducts Table:
    id SERIAL PRIMARY KEY, 
    name VARCHAR(50), 
    price integer, 
    category VARCHAR(50)

- orders Table:
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    status VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE

- order_products Table:
    order_id INTEGER,
    product_id INTEGER, 
    quantity INTEGER,
    PRIMARY KEY(order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE ON UPDATE CASCADE
