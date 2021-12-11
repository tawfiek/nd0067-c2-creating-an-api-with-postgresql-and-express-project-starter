CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY,
        user_id INT,
        order_status VARCHAR(255),

      CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
        REFERENCES users(id)
    );