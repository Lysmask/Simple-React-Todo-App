import React, { Component } from 'react';
import '../App.css'
// import Task from './Task'
import axios from 'axios';

class Tasks extends Component {
  state = { 
    taskArray : [],
    newTask : {
      description : '',
      author: '',
      location: '',
      solved: false
    }
  }
  
  handleNewTask = (e) => {
    var input = e.target.id
    const newTask = this.state.newTask
    switch (input) {
      case 'description':
        newTask.description = e.target.value
          this.setState({
            newTask
          })
        break;
      case 'author':
        newTask.author = e.target.value
        this.setState({
          newTask
        })
        break;
      case 'location':
        newTask.location = e.target.value
        this.setState({
          newTask
        })
        break;
      case 'solved':
        newTask.solved = e.target.checked
        this.setState({
          newTask
        })
        break;
      default:
        break;
    }
  }

  addTodo = (e) => {
    e.preventDefault()
    let data = this.state.newTask
    console.log(data)
    axios.post(
      'http://localhost:5000/todos/',
       data).then((res) => {
         this.getTodos()
         this.setState({
           newTask: {}
         })
        //  console.log(res)
       }).catch((err) => {
        //  console.log(err)
       })
  }

  getTodos = () => {
    axios.get('http://localhost:5000/todos/', {
    }).then((response) => {
      let taskArray = response.data
      // console.log(taskArray)
      // console.log(response)
      this.setState({
        taskArray
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount = () => {
    this.getTodos()
  }

  render() { 
    return ( 
      <div>
        <h1>Fastighet - Todo</h1>
        <form onSubmit={this.addTodo} onChange={this.handleNewTask}>
          <input id="description" type="text" placeholder="Description" required></input>
          <input id="location" type="text" placeholder="Location" required></input>
          <input id="author" type="text" placeholder="Author" required></input>
          <input id="solved" type="checkbox"></input>
          <input type="submit" value="Add" onClick={this.addTodo}></input>
        </form>
        <div>
          <h1>Tasks</h1>
            
          {this.state.taskArray.length ? 
            <table className="taskTableHeader">
              <thead>
                <tr>
                  <td>Description</td>
                  <td>Location</td>
                  <td>Author</td>
                  <td>Solved</td>
                </tr>
              </thead>
            </table>
            : 'noTable'}  

          {this.state.taskArray.length ? this.state.taskArray.map(todo => {
            return (
            <table className="taskTableData">
              <tbody>
                <tr>
                {/* <div key={todo._id} className="singleTask"> */}
                  <td className="tableData">{todo.description}</td>
                  <td className="tableData">{todo.location}</td>
                  <td className="tableData">{todo.author}</td>
                  <td className="tableData">{todo.solved === true ? 'Fixad' : 'Ej Fixad'}</td>
                {/* </div> */}
                </tr>
              </tbody>
            </table>
            )
          })
          : 'There are currently no tasks'}
        </div>
      </div>
      );
  }
}
 
export default Tasks;