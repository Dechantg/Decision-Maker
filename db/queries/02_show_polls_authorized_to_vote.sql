


SELECT polls.id AS poll_id, users.id AS user_id, authorized_to_vote.user_id AS authorized, users.email AS user, poll_name AS Name, poll_description AS description, poll_active AS status, result_winner AS winner, result_runner_up AS runner_up, result_third_choice AS third_choice, uuid
FROM authorized_to_vote
JOIN users ON users.id = user_id
JOIN polls ON authorized_to_vote.poll_id = polls.id
WHERE authorized_to_vote.user_id='3';

