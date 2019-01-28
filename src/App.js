import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
// import routes from './routes';
import Dashboard from './components/Dashboard/Dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
<Dashboard>
  
</Dashboard>
        </div>
      </HashRouter>
    );
  }
}

export default App;
 //