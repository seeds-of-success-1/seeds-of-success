UPDATE project_table
SET array = $2
WHERE id = $1
returning *;