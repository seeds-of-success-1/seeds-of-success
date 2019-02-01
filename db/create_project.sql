INSERT INTO seeds_projects
(
user_id, title, plant_array
)
VALUES
(
$1, $2, $3
)
returning *;