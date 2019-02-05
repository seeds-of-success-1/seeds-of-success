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
            res.status(200).send({ loggedIn: true, message: 'Register successful', username: createdUser[0].username, id: createdUser[0].id })
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
            req.session.user = { username: user[0].user_name, id: user[0].id, recentProject: user[0].recent_project }
            return res.status(200).send({
                loggedIn: true, message: 'Login successful', username: user[0].user_name, id: user[0].id, recentProject: user[0].recent_project
            })
        } else {
            return res.status(200).send({
                loggedIn: false, message: 'Incorrect password'
            })
        }
    },
    logout: async (req, res) => {
        req.session.destroy();
        return res.status(200).send({ loggedIn: false, message: 'Logout successful' });
    },
    getUser: async (req, res) => {
        if (!req.session.user) {
            return res.status(401).send({ message: 'You must log in first!' });
        }
        const username = req.session.user.username;
        const db = req.app.get('db');
        const user = await db.find_user([username]);
        if (!user[0]) {
            return res.status(401).send({ message: 'Cannot find User.' });
        }
        req.session.user = { username: user[0].user_name, id: user[0].id, recentProject: user[0].recent_project }
        return res.status(200).send({
             ...req.session.user
        })
    },
    getProject: async (req, res) => {
        const { project_id } = req.body;
        const user_id = req.session.user.id
        const db = req.app.get('db');
        //Make sure user is logged in
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        //Make sure project belongs to user
        const project = await db.users_project([user_id, project_id])
        if (!project[0]) { return res.status(401).send({ message: `No project with id: ${project_id} associated with this account` }) }
        res.status(200).send({ project: project[0], message: 'Fetched project' })
    },
    createNewProject: async (req, res) => {
        const user_id = req.session.user.id
        const {project_name} = req.body;
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        const db = req.app.get('db')
        const name = 'New Project';
        const title = project_name ? project_name : name;
        const arr = JSON.stringify([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
        const newProject = await db.create_project([user_id,title, arr]);
        await db.recent_project(newProject[0].id, user_id)
        res.status(200).send({ project: newProject[0], message: 'Successfully created new project' })
    },
    saveProject: async (req, res) => {
        const { plants, project_id } = req.body
        const user_id = req.session.user.id;
        const arr = JSON.stringify(plants)
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        const db = req.app.get('db')
        const oldProject = await db.users_project([user_id, project_id])
        if (!oldProject[0]) { return res.status(401).send({ message: `No project with id: ${project_id} associated with this account` }) }
        const newProject = await db.save_project([project_id, arr])
        await db.recent_project(newProject[0].id, user_id)
        res.status(200).send({ project: newProject[0], message: 'Successfully saved project' })
    },
    editProjectName: async (req, res) => {
        const { name, project_id } = req.body;
        const user_id = req.session.user.id;
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        const db = req.app.get('db')
        const oldProject = await db.users_project([user_id, project_id])
        if (!oldProject[0]) { return res.status(401).send({ message: `No project with id: ${project_id} associated with this account` }) }
        const newProject = await db.edit_project_name([project_id, name])
        res.status(200).send({ project: newProject[0], message: 'Successfully edited project name' })
    },
    deleteProject: async (req, res) => {
        const { project_id } = req.body;
        const user_id = req.session.user.id;
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        const db = req.app.get('db')
        const oldProject = await db.users_project([user_id, project_id])
        if (!oldProject[0]) { return res.status(401).send({ message: `No project with id: ${project_id} associated with this account` }) }
        await db.delete_project([project_id])
        res.status(200).send({ deleted: true, message: 'Successfully deleted project' })
    },
    getProjects: async (req, res) => {
        const db = req.app.get('db');
        const user_id = req.session.user.id;
        if (!user_id) { return res.status(401).send({ message: 'Must login first' }) }
        const projects = await db.get_project_titles([user_id]);
        if (!projects.length) {
            return res.status(200).send({ message: 'Unable to fetch projects' })
        } else {
            return res.status(200).send({ projects, message: "Successfully aquired projects" })
        }
    }
}