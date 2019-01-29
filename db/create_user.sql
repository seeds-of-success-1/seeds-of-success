INSERT INTO seeds_users (user_name, hash)
VALUES ($1, $2)
RETURNING *;