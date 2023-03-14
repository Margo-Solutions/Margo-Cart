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
    vare_navn VARCHAR(255)
    vare_link VARCHAR(255)
);

CREATE TABLE kjeder(
    kjede_id SERIAL PRIMARY KEY,
    kjede_navn VARCHAR(255)
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


UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1o4j7wBbJlYgHQyezXC_Ms1Oz-3gJxaCR' WHERE vare_navn = 'cola';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1dT07jPEGKHVHLMWG0tln9hL9wn8a1Ptx' WHERE vare_navn = 'laktosefrimelk';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=11rHXLY_roucW_wi6yKMsk7hjodDzcCj3' WHERE vare_navn = 'ost';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1l0UddyX4s2tgmM70CQ_l9_iaJxHD4VOk' WHERE vare_navn = 'brod';



https://drive.google.com/file/d/1o4j7wBbJlYgHQyezXC_Ms1Oz-3gJxaCR/view
1o4j7wBbJlYgHQyezXC_Ms1Oz-3gJxaCR -- Eksempel på en key
--For å legge til bilde til en eksisterende vare bruk denne koden. Fra google drive linken hent "key-en" som er mellom /d/ og /view og 
--Lim inn på linken til databasen.

UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1n2KXu2rRXe-cRpdpevrgePeLjeIauVkN' WHERE vare_navn = 'mango';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1S4G-6vD3O6Lx67ZqiZrBSGKThGcyJgjF' WHERE vare_navn = 'melk';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1PR2EoDhglEd9I0Znjkd_9mFb_SmRNyUT' WHERE vare_navn = 'poteter';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1KU0ZsGjVBZPPvhFmUPUFANrNVGJehiEt' WHERE vare_navn = 'spaghetti';
UPDATE varer SET vare_link='https://drive.google.com/uc?export=view&id=1u51WxXI-9l1NJbn1pnVgesMC8dXw17gN' WHERE vare_navn = 'taco krydder';



