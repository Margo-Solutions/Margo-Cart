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


