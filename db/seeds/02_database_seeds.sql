
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
  uuid CHAR(36),
  poll_creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_name VARCHAR(255),
  poll_description TEXT,
  created_at TIMESTAMP,
  opens_at TIMESTAMP,
  closes_at TIMESTAMP,
  poll_active BOOLEAN DEFAULT FALSE,

);


DROP TABLE IF EXISTS polls_options CASCADE;

CREATE TABLE polls_options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER,
  title VARCHAR(100),
  description VARCHAR(200)
);

DROP TABLE IF EXISTS user_choice CASCADE;

CREATE TABLE user_choice (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  poll_id INTEGER,
  option_id INTEGER,
  selection_made SMALLINT
);


DROP TABLE IF EXISTS authorized_to_vote CASCADE;

CREATE TABLE authorized_to_vote (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  poll_id INTEGER
);

ALTER TABLE polls
ADD CONSTRAINT fk_poll_creator FOREIGN KEY (poll_creator_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE polls_options
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_option_id FOREIGN KEY (option_id) REFERENCES polls_options(id) ON DELETE CASCADE;

ALTER TABLE authorized_to_vote
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE authorized_to_vote
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;


ALTER TABLE polls
ADD COLUMN result_one INTEGER REFERENCES polls_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_one
FOREIGN KEY (result_one) REFERENCES polls_options(id);




ALTER TABLE polls
ADD COLUMN result_two INTEGER REFERENCES polls_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_two
FOREIGN KEY (result_two) REFERENCES polls_options(id);



ALTER TABLE polls
ADD COLUMN result_three INTEGER REFERENCES polls_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_three
FOREIGN KEY (result_three) REFERENCES polls_options(id);


