use nfl_roster;

INSERT INTO team 
    (name) 
VALUES 
    ('Seahawks'),
    ('Jaguars'),
    ('Chiefs');

INSERT INTO position
    (title, team_id)
VALUES 
    ('Quarterback', 1),
    ('Runningback', 1),
    ('Wide Reciever', 1),
    ('Tight End', 1),
    ('Center', 1),
    ('Guard', 2),
    ('Tackle', 2),

    ('Defensive Line', 2),
    ('Linebacker', 3),
    ('Cornerback', 3),
    ('Safety', 3),
    ('Kicker', 3);


INSERT INTO player
    (first_name, last_name, salary, position_id, number_id)


VALUES
    ('Russell', 'Wilson',21000000, 1, 3),
    ('Chris', 'Carson', 20000000, 2, 32),
    ('Patrick', 'Mahomes', 10500000, 1, 15),
    ('Tyler', 'Lockett', 4000000, 3, 16),
    ('James', 'Robinson', 300000, 2, 30),
    ('Keelan', 'Cole', 25500000, 3, 84),
    ('Travis', 'Kelce', 38000000, 4, 87),
    ('Tyreek', 'Hill', 4000000, 3, 10),
    ('Jamal', 'Adams', 4500000, 11, 33),
    ('D.K.', 'Metcalf', 26000000, 3, 14),
    ('Clyde', 'Edwards-Hilaire', 3300000, 2, 25),
    ('Gardner', 'Minshew', 2500000, 1, 15);

