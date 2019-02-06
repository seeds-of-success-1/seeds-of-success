require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const controller = require('./controller')
const articleCtrl = require('./articles');

const app = express();
const { PORT, CONNECTION_STRING, SECRET } = process.env
app.use(express.json());

app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false
}));

app.post('/auth/register', controller.register);
app.post('/auth/login', controller.login);
app.get('/auth/user', controller.getUser);
app.get('/auth/logout', controller.logout);

app.post('/api/project/get', controller.getProject);
app.post('/api/project/new', controller.createNewProject);
app.post('/api/project/save', controller.saveProject);
app.post('/api/project/name', controller.editProjectName);
app.post('/api/project/delete', controller.deleteProject);
app.get('/api/project/projects', controller.getProjects);
app.put('/api/recent', controller.updateRecent);

app.get('/api/articles',articleCtrl.getArticles);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(PORT, () => {
        console.log('running on port: ' + PORT)
    })
})

