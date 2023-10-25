

SELECT poll_options.poll_id, user_id, title, description
FROM poll_options
JOIN authorized_to_vote ON authorized_to_vote.poll_id = poll_options.poll_id
WHERE user_id = '1';

