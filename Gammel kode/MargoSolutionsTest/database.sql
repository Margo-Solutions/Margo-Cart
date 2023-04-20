CREATE DATABASE margosolutions;

CREATE TABLE handlelister(
    handleliste_id SERIAL PRIMARY KEY,
    handleliste_tittel VARCHAR(255),
    vare_id integer REFERENCES varer (vare_id)
);

CREATE TABLE varer(
    vare_id SERIAL PRIMARY KEY,
    vare_navn VARCHAR(255)
);


ALTER TABLE handlelister 
ALTER COLUMN vare_id 