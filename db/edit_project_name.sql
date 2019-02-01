UPDATE seeds_projects
SET title = $2
WHERE id = $1
returning *;