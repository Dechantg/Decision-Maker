

SELECT users.email AS voter, polls.poll_name, user_choice.option_id, user_choice.selection_made
FROM user_choice
JOIN users ON users.id = user_choice.user_id
JOIN polls ON polls.id = user_choice.poll_id
WHERE users.id = '2' AND user_choice.poll_id = '1';
