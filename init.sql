create database pointsDB;

use pointsDB;

create table receipts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  retailer VARCHAR(255) NOT NULL,
  purchase_date DATE NOT NULL,
  purchase_time TIME NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  points INT NOT NULL DEFAULT 0
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_id CHAR(36),
    short_description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (receipt_id) REFERENCES receipts(id) ON DELETE CASCADE
);

# I have added 5 dummy example receipts to the database 

INSERT INTO receipts (id, retailer, purchase_date, purchase_time, total, points) VALUES
('81f2e7b1-2c56-4f55-a019-1a9e0b1dce11', 'M&M Corner Market', '2022-01-01', '13:01', 6.49, 14),
('0a3d4d18-d61c-4c0e-8fa0-012e3c8e9ff3', 'Walmart', '2023-02-15', '09:30', 15.98, 26),
('e917f70f-d681-4025-91e9-1f40404179d0', 'Target', '2023-08-10', '18:45', 22.75, 57),
('fadd29cf-e8ec-40e4-8198-b4a5e705f4a9', '7-Eleven', '2023-05-25', '20:15', 4.50, 89),
('54f23b45-6c71-4981-9c8e-0f11f1a5ce34', 'Costco', '2023-12-31', '12:00', 48.90, 100);


INSERT INTO items (receipt_id, short_description, price) VALUES
('81f2e7b1-2c56-4f55-a019-1a9e0b1dce11', 'Mountain Dew 12PK', 6.49),
('0a3d4d18-d61c-4c0e-8fa0-012e3c8e9ff3', 'Shampoo Bottle', 6.99),
('0a3d4d18-d61c-4c0e-8fa0-012e3c8e9ff3', 'Toothpaste', 8.99),
('e917f70f-d681-4025-91e9-1f40404179d0', 'Bluetooth Speaker', 22.75),
('fadd29cf-e8ec-40e4-8198-b4a5e705f4a9', 'Slurpee', 2.00),
('fadd29cf-e8ec-40e4-8198-b4a5e705f4a9', 'Hot Dog', 2.50),
('54f23b45-6c71-4981-9c8e-0f11f1a5ce34', 'Office Chair', 48.90);