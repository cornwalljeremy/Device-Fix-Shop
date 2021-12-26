USE inventory_db;

BEGIN;

INSERT INTO platforms (name)
VALUES ('Android'), ('iOS'), ('Windows');

INSERT INTO models (name, screen_size, platform_id)
VALUES
  ('Samsung Galaxy A51', 6.5, 1),
  ('iPhone 12 Pro Max', 6.7, 2),
  ('Lumia 950 XL', 5.7, 3);

INSERT INTO devices (cond, notes, model_id)
VALUES
  (9, NULL, 1),
  (7, 'slight crack in screen', 1),
  (2, 'device won''t turn on', 2),
  (4, 'screen isn''t damaged but is not responsive to touch', 3);

COMMIT;
