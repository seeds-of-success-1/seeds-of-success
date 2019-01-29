-- create user

INSERT INTO seeds_users (user_name, hash)
VALUES ($1, $2, $3)
RETURNING *;

--find user

SELECT * FROM seeds_users
WHERE user_name = $1;