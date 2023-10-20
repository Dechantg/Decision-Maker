

## Users Database
user_id Primary Key
email VARCHAR(255)



## polls Database
poll id Primary Key
poll_creator_id (FK from userdatabase)
poll_name VARCHAR(55)
poll_description VARCHAR(105) **
created_at TIMESTAMP
opens_at TIMESTAMP **
closes_at TIMESTAMP
poll_active BOOLEAN default false
final_result SMALLINT



## polls_options Database
option_id PK
poll_id (FK from polls database)
option VARCHAR(100)



## user_choices Database
choice_id PK
poll_id FK
question_id FK
user_id FK
selection_made SMALLINT
