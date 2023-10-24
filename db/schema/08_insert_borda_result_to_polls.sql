



UPDATE polls
SET result_winner = (
  SELECT option_id
  FROM (
    SELECT option_id,
           SUM(selection_made * (SELECT COUNT(DISTINCT option_id) FROM user_choice WHERE poll_id = polls.id)) AS borda_score
    FROM user_choice
    WHERE poll_id = polls.id
    GROUP BY option_id
    ORDER BY borda_score DESC
    LIMIT 1
  ) AS borda_options
);

UPDATE polls
SET result_runner_up = (
  SELECT option_id
  FROM (
    SELECT option_id,
           SUM(selection_made * (SELECT COUNT(DISTINCT option_id) FROM user_choice WHERE poll_id = polls.id)) AS borda_score
    FROM user_choice
    WHERE poll_id = polls.id
    GROUP BY option_id
    ORDER BY borda_score DESC
    LIMIT 1 OFFSET 1
  ) AS borda_options
);

UPDATE polls
SET result_third_choice = (
  SELECT option_id
  FROM (
    SELECT option_id,
           SUM(selection_made * (SELECT COUNT(DISTINCT option_id) FROM user_choice WHERE poll_id = polls.id)) AS borda_score
    FROM user_choice
    WHERE poll_id = polls.id
    GROUP BY option_id
    ORDER BY borda_score DESC
    LIMIT 1 OFFSET 2
  ) AS borda_options
);
