CREATE DATABASE handleliste;

CREATE TABLE handleliste (
  id SERIAL PRIMARY KEY,
  handleliste VARCHAR(255)
);


------------------------------------
CREATE DATABASE margodatabase;

CREATE TABLE kunder (
  id SERIAL PRIMARY KEY,
  navn VARCHAR(240),
  email VARCHAR(240),
  Passord VARCHAR(240)
);


