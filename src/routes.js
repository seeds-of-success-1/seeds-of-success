import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Project from './components/Project/Project';
import Articles from './components/Articles/Articles'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/project:id' component={Project}/>
        <Route path='/articles' component={Articles}/>
    </Switch>
)