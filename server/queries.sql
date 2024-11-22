DROP TABLE IF EXISTS users, birthdays;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100)
);

CREATE TABLE birthdays(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL,
  comment TEXT,
  user_id INTEGER REFERENCES users(id)
);

INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname1', 'lname1', '1996-10-01', 'buy flowers', 2);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname2', 'lname2', '1996-10-13', 'buy flowers', 2);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname3', 'lname3', '1996-10-02', 'buy flowers', 2);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-10-31', '' , 2);