

SELECT title, description, user_choice.selection_made AS user_choice
FROM polls_options
JOIN user_choice ON option_id = polls_options.id
WHERE user_choice.selection_made = '3' OR user_choice.selection_made = '2' OR user_choice.selection_made = '1';


SELECT title, description, user_choice.selection_made AS user_choice
FROM polls_options
JOIN user_choice ON option_id = polls_options.id
WHERE user_choice.selection_made = '2';



SELECT title, description, user_choice.selection_made AS user_choice
FROM polls_options
JOIN user_choice ON option_id = polls_options.id
WHERE user_choice.selection_made = '1';
