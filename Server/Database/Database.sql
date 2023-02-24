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