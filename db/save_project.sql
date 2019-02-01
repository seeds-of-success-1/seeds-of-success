UPDATE seeds_projects
SET plant_array = $2
WHERE id = $1
returning *;