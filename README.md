# Storefront Backend Project - Udacity Nanodegree Fullstack JavaScript #

## Introduction ##

REST API JavaScript Application for a storefront backend

---
## Creating the Database
1. Run psql Terminal
2. Log into postgres database as user postgres OR log into any database as user postgres
3. Run below commands one by one to set up the test database for the storefront api:
    ```
    For testing purposes:
        CREATE DATABASE storefront_db_test;
    For production purposes:
        CREATE DATABASE storefront_db;
    CREATE USER storefront_test_user with encrypted password 'store123';
    GRANT ALL ON SCHEMA public to storefront_test_user;
    GRANT ALL PRIVILEGES ON DATABASE storefront_db_test (or storefront_db for production) to storefront_test_user;
    ALTER DATABASE storefront_db_test (or storefront_db in production) OWNER TO storefront_test_user;
    ```

4. Then run below commands to confirm database and user creation
    Switch to database storefront_db_test by running:
    ```
        \c storefront_db_test
    ```
    Confirm no relations in database:
    ```
        \dt
    ```
---
## Project Initial Setup
1. Open a new terminal and navigate to project root folder
    i.e Open the project folder in a terminal
2. To install yarn globally
    npm install yarn -g
3. To install package.json dependencies and other dependencies
    yarn install
4. In the project root folder, create a new file and name it .env
    The .env file will store environment variables
5. The following lines are an example of what goes into the .env file. 
    Copy paste into your .env file
    
    ```
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storefront_db
    POSTGRES_TEST_DB=storefront_db_test
    POSTGRES_USER=storefront_test_user
    POSTGRES_PASSWORD=store123
    ENV=dev
    BCRYPT_PASSWORD=secret-password-to-passageway
    SALT_ROUNDS=8
    TOKEN_SECRET=b1envenu3$
    ```
---

## PORTS
Backend Application: Port 3000
Database: Port 5432

---

## Running the Application ##
In your package.json file, change ENV=test to ENV=dev in the "test": script line
Run "db-migrate up" without quotes to create tables
Run "yarn watch" (without quotes) to run the server on port 3000
    You get the message "Found 0 errors. Watching for file changes." on successful run
Visit http://localhost:3000/ to confirm from the browser that the app is up and running

Visit below routes as outlined to carry out respective operations:
For test data, navigate to the utils folder and copy paste json lines as needed into Postman.

# User-related actions
1. Create user: 
        /users/create [POST]
2. User login: 
        /users/login [POST]
    Copy returned token and paste in Postman > Authorization > Bearer Token
3. Return user with id: 
        /users/:userId [GET]
4. Return all users: 
        /users/ [GET]
5. Delete user with id: 
        /users/delete/:id [DELETE]

# Product-related actions
1. Create product: 
        /products/create [POST]
2. Return product with id: 
        /products/:prodId [GET]
3. Return category products: 
        /products/category/:cat [GET]
4. Return all products: 
        /products/ [GET]
5. Delete product with id: 
        /products/delete/:id [DELETE]

# Order-related actions
1. Create order: 
        /orders/create [GET]
2. Return active orders with user id:
        /orders/active/:userId [GET]
3. Update order status:
        /orders/update-status [POST]
4. Return completed orders with user id:
        /orders/completed/:userId [GET]
5. Return all orders belonging to user:
        /orders/all/:userId [GET]
6. Delete order by id:
        /orders/delete/:id [DELETE]


#### Testing ####
To build the project and run tests:
```
yarn test
```

#### Formatting ####
```
yarn prettier
```

#### Linting ####

```
yarn lint
```
---
