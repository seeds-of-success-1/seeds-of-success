const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        let { username, password } = req.body;
        const db = req.app.get('db');
        let user = await db.find_user([username]);
        if (user[0]) {
            return res.status(200).send({
                loggedIn: false, message: 'Username already in use'
            })
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)
            let createdUser = await db.create_user([username, hash])
            req.session.user = { username: createdUser[0].username, id: createdUser[0].id }
            res.status(200).send({loggedIn: true, message: 'Register successful', username: createdUser[0].username, id: createdUser[0].id})
        }
    },
    login: async (req, res) => {
        let { username, password } = req.body;
        const db = req.app.get('db');
        let user = await db.find_user([username]);
        if (!user[0]) {
            return res.status(200).send({
                loggedIn: false, message: 'Username not found'
            })
        } 
        let result = bcrypt.compareSync(password, user[0].hash)
        if (result) {
            req.session.user = { username: user[0].user_name, id: user[0].id }
            return res.status(200).send({
                loggedIn: true, message: 'Login successful', username: user[0].user_name, id: user[0].id
            })
        } else {
            return res.status(200).send({
                loggedIn: false, message: 'Incorrect password'
            })
        }
    }
}