

SELECT polls.id AS poll_id, users.email AS creator, poll_name AS Name, poll_description AS description, poll_active AS status, result_winner AS winner, result_runner_up AS runner_up, result_third_choice AS third_choice, uuid
FROM polls
JOIN users ON users.id = poll_creator_id
WHERE polls.id='3';
