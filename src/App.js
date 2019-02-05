import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getPlants,getArticles} from './ducks/reducer';
import routes from './routes';
import Nav from './components/Nav/Nav'
import './App.css';

class App extends Component {
  componentDidMount(){
    this.props.getPlants();
    this.props.getArticles();
  }
  render() {
    return (

      <HashRouter>
        <div className="App">
          {routes}
        <Nav/>
        </div>
      </HashRouter>


    );
  }
}

export default connect(null,{getPlants,getArticles})(App) ;

