import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Tasks from './Components/Tasks'

class App extends Component {

  render() { 
    return (
      <div className="col-md-12 outerBox">
        <Tasks/>
      </div>
     
  )};
}
 
export default App;
