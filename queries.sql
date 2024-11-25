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

INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname1', 'lname1', '1996-01-01', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname2', 'lname2', '1996-01-13', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname3', 'lname3', '1996-01-02', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-01-31', 'buy flowers', 3);

INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-02-05', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-02-10', 'buy flowers', 3);

INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-03-06', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-03-08', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-03-08', 'buy flowers', 3);


INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-11-20', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-11-25', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-11-26', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-11-27', 'buy flowers', 3);
INSERT INTO birthdays (first_name, last_name, birthdate, comment, user_id) VALUES ('fname4', 'lname4', '1996-11-28', 'buy flowers', 3);