

## Users Database
user_id SERIAL PRIMARY KEY NOT NULL
first_name VARCHAR(255)
last_name VARCHAR(255)
email VARCHAR(255)


## authorized_to_vote Database
id SERIAL PRIMARY KEY NOT NULL
user_id FK FROM users(id) NOT NULL
poll_id FK FROM polls(id) NOT NULL


## polls Database
poll id SERIAL PRIMARY KEY NOT NULL
poll_creator_id (FK from userdatabase)
page_link (6 digit page identifier tinyapp style)
poll_name VARCHAR(55)
created_at TIMESTAMP
closes_at TIMESTAMP
poll_active BOOLEAN DEFAULT FALSE
final_result FK (options database)

** poll_description VARCHAR(105)
** opens_at TIMESTAMP


## polls_options Database
option_id SERIAL PRIMARY KEY NOT NULL
poll_id (FK from polls database)
title VARCHAR(100)
description VARCHAR(255)


## user_choices Database
choice_id PK
poll_id FK
question_id FK
user_id FK
selection_made SMALLINT
