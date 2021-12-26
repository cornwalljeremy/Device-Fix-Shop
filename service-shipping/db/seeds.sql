USE shipping_db;

INSERT INTO addresses
  (street, city, state, postal_code)
VALUES
  ('Mulberry Road', 'Glendale', 'CA', 91020),
  ('Arrowhead Drive', 'Tombestone', 'AZ', 85638),
  ('Virginia Avenue', 'Jackson', 'WY', 83002),
  ('Windy Lane', 'Chicago', 'IL', 60176);

INSERT INTO shipments
  (tracking_number, expected_arrival, address_id)
VALUES
  ('RA774410470US', DATE_SUB(NOW(), INTERVAL 2 DAY), 2),
  ('RA396150753US', DATE_ADD(NOW(), INTERVAL 3 DAY), 3),
  ('RA000261598US', DATE_ADD(NOW(), INTERVAL 5 DAY), 1),
  ('RA308490348US', DATE_SUB(NOW(), INTERVAL 1 DAY), 4),
  ('RA231938226US', DATE_ADD(NOW(), INTERVAL 7 DAY), 2),
  ('RA475228415US', DATE_SUB(NOW(), INTERVAL 5 DAY), 4),
  ('RA802876018US', DATE_ADD(NOW(), INTERVAL 2 DAY), 1);

INSERT INTO shipping_updates
  (updated_on, status, location, shipment_id)
VALUES
  (DATE_SUB(NOW(), INTERVAL 1 DAY), 'Delivered', 'Tombestone, AZ,', 1),
  (DATE_ADD(NOW(), INTERVAL 2 HOUR), 'In-transit', 'Cleaveland, OH', 2),
  (DATE_SUB(NOW(), INTERVAL 1 DAY), 'Packaging', 'Lewiston, ME', 3),
  (DATE_SUB(NOW(), INTERVAL 12 HOUR), 'In-transit', 'Phoenix, AZ', 3),
  (DATE_SUB(NOW(), INTERVAL 1 HOUR), 'Delivered', 'Chicago, IL', 4),
  (DATE_ADD(NOW(), INTERVAL 2 DAY), 'Lost', 'Tombestone, AZ', 5),
  (DATE_ADD(NOW(), INTERVAL 4 DAY), 'In-transit', 'Chico, CA', 5),
  (DATE_SUB(NOW(), INTERVAL 7 DAY), 'In-transit', 'Salem, OR', 6),
  (DATE_ADD(NOW(), INTERVAL 1 DAY), 'In-transit', 'Austin, TX', 7);