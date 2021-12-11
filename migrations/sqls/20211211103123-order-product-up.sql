
CREATE TABLE  IF NOT EXISTS order_product (
    id BIGINT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,

    CONSTRAINT fk_order_id
      FOREIGN KEY(order_id)
      REFERENCES orders(id),

    CONSTRAINT fk_product_id
      FOREIGN KEY(product_id)
      REFERENCES product(id)
);