SELECT title, id
FROM seeds_projects
WHERE user_id = $1;
