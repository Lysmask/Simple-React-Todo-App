import React, { Component } from 'react';
import '../App.css'

class Task extends Component {
  state = {
    id: React.createRef('id')
   }

  render() {
    const {name, id, onDelete} = this.props


    return (
      <div id={id}>
        <span className="singleTask">
          <h3 className="singleTaskName">{name}</h3>
          <input type="button" value="Delete" onClick={onDelete}></input>
        </span>
      </div>
    );
  }
}
 
export default Task;