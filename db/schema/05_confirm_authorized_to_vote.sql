

SELECT title, description
FROM polls_options
JOIN authorized_to_vote ON authorized_to_vote.poll_id = polls_options.poll_id
WHERE user_id = '1';

