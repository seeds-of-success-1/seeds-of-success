require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const controller = require('./controller')

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

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    app.listen(PORT, () => {
        console.log('running on port: ' + PORT)
    })
})

