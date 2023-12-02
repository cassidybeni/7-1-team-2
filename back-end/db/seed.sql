\c partyplanning_dev;

INSERT INTO users ( password, email, created_at) VALUES
('fakepassword' ,'fakeemail@email.com','2020-10-19 10:23:54'),
('password' ,'email@email.com','2020-10-19 10:23:54');

INSERT INTO events ( event_name , event_budget, event_date, event_time, user_id ) VALUES
('Linda''s Baby Shower' , 1000, '2021-10-30', '00:30:00', 1),
('Sara''s Birthday Party' , 1500, '2021-10-30', '00:30:00', 1),
('Michael''s Retirement Party', 2000, '2021-10-30', '00:30:00', 1),
('Laura''s Baby Shower' , 1000, '2021-10-30', '00:30:00', 2),
('Mindy''s Birthday Party' , 1500, '2021-10-30', '00:30:00', 2),
('Justin''s Retirement Party' , 2000, '2021-10-30', '00:30:00', 2);

INSERT INTO tasklist (task_name, is_completed, user_id, event_id) VALUES 
('catering', false, 1, 1),
('djs', false, 1, 1),
('musicians', false, 1, 1),
('party_rental', false, 1, 1),
('photographers', false, 1, 1),
('videographers', false, 1, 1),
('venues', false, 1, 1),
('balloons', false, 1, 1),
('floral', false, 1, 1),

('catering', false, 1, 2),
('djs', false, 1, 2),
('musicians', false, 1, 2),
('party_rental', false, 1, 2),
('photographers', false, 1, 2),
('videographers', false, 1, 2),

('catering', false, 1, 3),
('djs', false, 1, 3),
('musicians', false, 1, 3),
('party_rental', false, 1, 3),
('photographers', false, 1, 3),
('videographers', false, 1, 3),

('catering', false, 2, 4),
('djs', false, 2, 4),
('musicians', false, 2, 4),
('party_rental', false, 2, 4),
('photographers', false, 2, 4),
('videographers', false, 2, 4),

('catering', false, 2, 5),
('djs', false, 2, 5),
('musicians', false, 2, 5),
('party_rental', false, 2, 5),
('photographers', false, 2, 5),
('videographers', false, 2, 5);



INSERT INTO booked (user_id, event_id, vendor_name, vendor_address, vendor_phone_number, vendor_image, rating, category, amount) VALUES
(1, 1,  'Dave & Busters', '234 west 42nd street, New York, NY, 10036', '6464952015', 'https://rcbizjournal.com/wp-content/uploads/2020/09/davebuster.png', 5, 'catering', 400),
(1, 1, 'Tokyo Sushi', '123 Main Street, New York, NY, 10036', '7185551234', 'https://bloximages.chicago2.vip.townnews.com/madison.com/content/tncms/assets/v3/editorial/b/a9/ba994cfd-d320-5352-aa02-957a27a47e43/5e4b5dfa95393.preview.jpg?crop=1833%2C1031%2C0%2C49&resize=1833%2C1031&order=crop%2Cresize', 5, 'venues', 500),
(2, 4,  'Lotos Thai', '555 East 27 street, New York, NY, 10036', '3475551234', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/db/d8/d9/lotus-thai-restaurant.jpg', 5, 'catering', 600),
(2, 4,  'Bengal Tiger Indian', '777 west 77nd street, New York, NY, 10036', '6461234567', 'https://www.nyrestaurantsguide.com/wp-content/uploads/img/indpak/bengal/bengal_tiger_indian_food_new_york_inside_4-600x800.jpg', 5, 'venues', 700);


INSERT INTO favorites (user_id, vendor_name, vendor_address, vendor_phone_number, vendor_id, vendor_image, vendor_category, vendor_rating) VALUES
(1, 'Dave & Busters', '234 west 42nd street, New York, NY, 10036', '6464952015','jwghjgvw', 'https://rcbizjournal.com/wp-content/uploads/2020/09/davebuster.png', 'catering', 5),
(1, 'Tokyo Sushi', '123 Main Street, New York, NY, 10036', '7185551234', 'jwbhgyux', 'https://bloximages.chicago2.vip.townnews.com/madison.com/content/tncms/assets/v3/editorial/b/a9/ba994cfd-d320-5352-aa02-957a27a47e43/5e4b5dfa95393.preview.jpg?crop=1833%2C1031%2C0%2C49&resize=1833%2C1031&order=crop%2Cresize', 'venues', 5),
(2, 'Lotos Thai', '555 East 27 street, New York, NY, 10036', '3475551234', 'whjbhdv', 'https://media-cdn.tripadvisor.com/media/photo-s/0a/db/d8/d9/lotus-thai-restaurant.jpg', 'catering', 5),
(2, 'Bengal Tiger Indian', '777 west 77nd street, New York, NY, 10036', '6461234567', 'whvwg', 'https://www.nyrestaurantsguide.com/wp-content/uploads/img/indpak/bengal/bengal_tiger_indian_food_new_york_inside_4-600x800.jpg', 'venues', 5);
 





