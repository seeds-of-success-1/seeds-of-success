SELECT title, id, plant_array
FROM seeds_projects
WHERE user_id = $1;
