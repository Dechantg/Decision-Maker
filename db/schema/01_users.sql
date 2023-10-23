-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)

);


DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_name VARCHAR(255),
  poll_description TEXT,
  created_at TIMESTAMP,
  opens_at TIMESTAMP,
  closes_at TIMESTAMP,
  poll_active BOOLEAN DEFAULT FALSE,
  final_result SMALLINT
);

DROP TABLE IF EXISTS polls_options CASCADE;

CREATE TABLE polls_options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  title VARCHAR(100),
  description VARCHAR(200)
);

DROP TABLE IF EXISTS user_choice;

CREATE TABLE user_choice (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES option(id) ON DELETE CASCADE,
  selection_made SMALLINT
);

DROP TABLE IF EXISTS authorized_to_vote CASCADE;

CREATE TABLE authorized_to_vote (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
);
