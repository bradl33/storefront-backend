CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(25), 
    lastname VARCHAR(25), 
    username VARCHAR(20),
    password_digest VARCHAR
);