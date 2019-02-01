INSERT INTO project_table
(
user_id, name, array
)
VALUES
(
$2, $3, $4
)
WHERE id = $1
returning *;