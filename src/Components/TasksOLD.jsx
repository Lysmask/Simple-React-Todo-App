import React, { Component } from 'react';
import '../App.css'
import Task from './Task'
import axios from 'axios';

class Tasks extends Component {
  state = { 
    taskArray : [],
    newTask : '',
    lastId: 0,
   }

  componentDidMount() {
    axios.get('http://localhost:5000/todos/', {
    }).then((response) => {
      console.log(response)
      let taskArray = response.data
      this.setState({
        taskArray
      })
    }).catch((error) => {
      console.log(error)
    })
  }

   onDelete = (id) => {
   let taskArray = this.state.taskArray.filter(e => e.id !== id )

    this.setState({
      taskArray
    })
   }

   handleNewTask = (event) => {
    this.setState({
      newTask: event.target.value,
    })
  }
  
  // Adds a new task by adding it to the array of tasks
  addTask = (event) => {
    event.preventDefault()


    if (this.state.newTask) {
      let newTask = {
        id: this.state.lastId +1,
        name: this.state.newTask,
      }
      
      let taskArray = this.state.taskArray
      taskArray.push(newTask)
      
      this.setState({
        taskArray,
        newTask: '',
        lastId: this.state.lastId +1
      })
    } return
  }

  render() { 
    return ( 
      <div className="taskList">
          <h1 className="taskListHeader "> 
            Tasklist
          </h1>

          <div className="taskListContainer">

            <div>
              <form className="addTaskContainer" onSubmit={this.addTask}> 
                <input placeholder="Add Task.." type="text" value={this.state.newTask} onChange={this.handleNewTask}/>
              <input value="ADD" type="button" onClick={this.addTask} />
              </form>
            </div>

            {this.state.taskArray.map(task => (
              <Task 
                name={task.description}
                key={task._id}
                onDelete={() => this.onDelete(task._id)}
                
                />
                
            ))}

          </div>
      </div> );
  }
}
 
export default Tasks;