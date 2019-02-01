UPDATE seeds_projects
SET array = $2
WHERE id = $1
returning *;