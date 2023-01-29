CREATE TABLE IF NOT EXISTS order_products (
    order_id INTEGER,
    product_id INTEGER, 
    quantity INTEGER,
    PRIMARY KEY(order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);