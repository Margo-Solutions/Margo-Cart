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
);

CREATE TABLE varer(
    vare_id SERIAL PRIMARY KEY,
    vare_navn VARCHAR(255)
);

