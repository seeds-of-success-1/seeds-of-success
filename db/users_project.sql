SELECT *
FROM seeds_projects
WHERE user_id = $1 AND id = $2;