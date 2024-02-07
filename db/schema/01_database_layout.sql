-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  password_hash TEXT,
  signed_up BOOLEAN DEFAULT FALSE
);

-- Create the 'polls' table
CREATE TABLE IF NOT EXISTS polls (
  id SERIAL PRIMARY KEY NOT NULL,
  uuid CHAR(36),
  poll_creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_name VARCHAR(255),
  poll_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  opens_at TIMESTAMP,
  closes_at TIMESTAMP,
  poll_active BOOLEAN DEFAULT FALSE,
  result_winner INTEGER REFERENCES poll_options(id),
  result_runner_up INTEGER REFERENCES poll_options(id),
  result_third_choice INTEGER REFERENCES poll_options(id),
  poll_deleted BOOLEAN DEFAULT false
);

-- Create the 'poll_options' table
CREATE TABLE IF NOT EXISTS poll_options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER,
  title VARCHAR(100),
  description VARCHAR(200)
);

-- Create the 'user_choice' table
CREATE TABLE IF NOT EXISTS user_choice (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES poll_options(id) ON DELETE CASCADE,
  selection_made SMALLINT
);

-- Create the 'authorized_to_vote' table
CREATE TABLE IF NOT EXISTS authorized_to_vote (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  has_voted BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE
);

-- Add Foreign Key (FK) constraints
ALTER TABLE polls
ADD CONSTRAINT fk_poll_creator FOREIGN KEY (poll_creator_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE poll_options
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;

ALTER TABLE user_choice
ADD CONSTRAINT fk_option_id FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE;

ALTER TABLE authorized_to_vote
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE authorized_to_vote
ADD CONSTRAINT fk_poll_id FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE;


ALTER TABLE polls
ADD COLUMN result_winner INTEGER REFERENCES poll_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_winner FOREIGN KEY (result_winner) REFERENCES poll_options(id);


ALTER TABLE polls
ADD COLUMN result_runner_up INTEGER REFERENCES poll_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_runner_up FOREIGN KEY (result_runner_up) REFERENCES poll_options(id);


ALTER TABLE polls
ADD COLUMN result_third_choice INTEGER REFERENCES poll_options(id);


ALTER TABLE polls
ADD CONSTRAINT fk_result_third_choice FOREIGN KEY (result_third_choice) REFERENCES poll_options(id);

ALTER TABLE user_choice
ADD CONSTRAINT user_poll_option_unique UNIQUE (user_id, poll_id, option_id);
