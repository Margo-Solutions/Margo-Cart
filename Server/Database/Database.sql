CREATE DATABASE handleliste;

CREATE TABLE handleliste (
  id SERIAL PRIMARY KEY,
  handleliste VARCHAR(255)
);


------------------------------------
CREATE DATABASE margodatabase;

CREATE TABLE kunder (
  id SERIAL PRIMARY KEY,
  navn VARCHAR(240) NOT NULL CHECK (navn <> ''),
  email VARCHAR(240) NOT NULL CHECK (email <> ''),
  passord VARCHAR(240) NOT NULL CHECK (passord <> '')
);


------------------------------------
CREATE TABLE handlelister(
    handleliste_id SERIAL PRIMARY KEY,
    kunde_id integer REFERENCES kunder (id),
    handleliste_tittel VARCHAR(255)
);

CREATE TABLE handleliste (
  id SERIAL PRIMARY KEY,
  handleliste_id integer REFERENCES handlelister (handleliste_id),
  vare_id integer REFERENCES varer (vare_id)
  antall integer
);

CREATE TABLE varer(
    vare_id SERIAL PRIMARY KEY,
    vare_navn VARCHAR(255),
    vare_link VARCHAR(255)
);

CREATE TABLE kjeder(
    kjede_id SERIAL PRIMARY KEY,
    kjede_navn VARCHAR(255),
);

CREATE TABLE sted(
    sted_id SERIAL PRIMARY KEY,
    sted VARCHAR(255),
    postnummer INT
);

CREATE TABLE butikker(
    butikk_id SERIAL PRIMARY KEY,
    kjede_id integer REFERENCES kjeder (kjede_id),
    adresse VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    sted_id integer REFERENCES sted (sted_id)
);
 
--eksempel innhold 
 -- butikk_id | kjede_id |             adresse              | latitude | longitude | sted_id
-----------+----------+----------------------------------+----------+-----------+---------
--          1 |        1 | Vikersundgata 32, 3370 Vikersund |  9.99429 |  59.96529 |       1
--          2 |        1 | Storgata, 3320 Vestfossen        |  9.86942 |  59.73459 |       3
--          3 |        2 | Karsches gate 3                  | 59.66886 |   9.65187 |       2


CREATE TABLE vareliste(
    vareliste_id SERIAL PRIMARY KEY,
    vare_id integer REFERENCES varer (vare_id),
    butikk_id integer REFERENCES butikker (butikk_id),
    varehylle_id integer REFERENCES varehyller (varehylle_id)
);
CREATE TABLE varehyller(
    varehylle_id SERIAL PRIMARY KEY,
    butikk_id integer REFERENCES butikker (butikk_id),
    coord_id integer REFERENCES koordinater (coord_id)
);
CREATE TABLE koordinater(
    coord_id SERIAL PRIMARY KEY,
    x INT,
    y INT
);

UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1o4j7wBbJlYgHQyezXC_Ms1Oz-3gJxaCR' WHERE vare_navn = cola;
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1dT07jPEGKHVHLMWG0tln9hL9wn8a1Ptx' WHERE vare_navn = 'lettmelk';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=11rHXLY_roucW_wi6yKMsk7hjodDzcCj3' WHERE vare_navn = 'ost';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1l0UddyX4s2tgmM70CQ_l9_iaJxHD4VOk' WHERE vare_navn = 'brod';
https://drive.google.com/file/d/1b6QRnde2ui4Tg0OQ_3PumHiJjYfxLXZ3/view?usp=share_link

INSERT varer(vare_navn, vare_link) VALUES('cola', 'https://drive.google.com/uc?export=view&id=1b6QRnde2ui4Tg0OQ_3PumHiJjYfxLXZ3')
https://drive.google.com/file/d/1o4j7wBbJlYgHQyezXC_Ms1Oz-3gJxaCR/view
 x y 
(0,1)
INSERT INTO koordinater (x, y) VALUES (, 1), (0,2), (0, 3), (0,4), (0, 5), (0,6),(0, 7), (0,8), (0, 9), (0,10), (0, 11), (0,12);
INSERT INTO koordinater (x, y) VALUES (0, 1), (0,2), (0, 3), (0,4), (0, 5), (0,6),(0, 7), (0,8), (0, 9), (0,10), (0, 11), (0,12);

INSERT INTO koordinater (x, y) VALUES (10, 3), (10,4), (10, 5), (10,6), (10, 7), (10,8),(10, 9), (10,10), (10, 11), (10,12);
SELECT kjeder.kjede_navn, butikker.adresse FROM butikker INNER JOIN kjeder ON butikker.kjede_id = kjeder.kjede_id WHERE kjeder.kjede_navn LIKE '%" + kjede_navn + "%'
SELECT varer.vare_navn, varehyller.coord_id, koordinater.x, koordinater.y FROM vareliste INNER JOIN varer ON vareliste.vare_id = varer.vare_id INNER JOIN varehyller ON vareliste.varehylle_id = varehyller.varehylle_id INNER JOIN koordinater ON varehyller.coord_id = koordinater.coord_id WHERE butikk_id = 1;


SELECT varer.vare_navn, varehyller.coord_id, koordinater.x, koordinater.y FROM vareliste INNER JOIN varer ON vareliste.vare_id = varer.vare_id INNER JOIN varehyller ON vareliste.varehylle_id = varehyller.varehylle_id INNER JOIN koordinater ON varehyller.coord_id = koordinater.coord_id WHERE butikk_id = 1 AND varer.vare_navn = 'ost';