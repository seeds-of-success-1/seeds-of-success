UPDATE project_table
SET name = $2
WHERE id = $1
returning *;