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

  componentDidMount = () => {
    this.getTodos()
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

   async removeTodo(id) {
    // e.preventDefault()
    let url = 'http://localhost:5000/todos/' + id
     await axios.delete(url).then((res) => {
      console.log(res)
    }).then( 
      this.getTodos()
    )
  }

  getTodos = () => {
    axios.get('http://localhost:5000/todos/', {
    }).then((response) => {
      let taskArray = response.data
      this.setState({
        taskArray
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  toggleSolved(task) {
    let url = 'http://localhost:5000/todos/' + task
    console.log(url)
      axios.patch(url, {
        }).then((res) => {
          console.log(res)
          this.getTodos()
    })
  }

  renderTableHeader = () => {
    return (  
      <tr>
       <td className="tableHeader">Description</td>
       <td className="tableHeader">Location</td>
       <td className="tableHeader">Author</td>
       {/* <td className="tableHeader">Solved</td> */}
      </tr>
    )
  }

  renderRemoveButton(todo) {
    return(
      <button className="solveButtons" onClick={() => {this.removeTodo(todo._id)}}>
        Remove
      </button>
    )
  }

  renderTableData = () => {
    let sortedArray = this.state.taskArray.sort((a) => {
     return a.solved ? 1 : -1
    })
    return sortedArray.map((todo) => {
      return (
        <tr className={ (todo.solved ? 'fixed' : 'notFixed') } key={todo._id}>
          <td className="tableData">{todo.description}</td>
          <td className="tableData">{todo.location}</td>
          <td className="tableData">{todo.author}</td>
          {/* <td className="tableData">{todo.solved === true ? 'Fixad' : 'Ej Fixad'}</td> */}
          <td>
            <button className="solveButtons" onClick={ () => { this.toggleSolved(todo._id) } }>
               {todo.solved === true ? 'Unsolve' : 'Solve'}
            </button>
            {todo.solved ? this.renderRemoveButton(todo) : ''}
            
          </td>
        </tr>
      )
    })
  }

  render() { 
    return ( 
      <div>
        <h1 style={{textAlign:"center"}}>Todo List</h1>
        <form onSubmit={this.addTodo} onChange={this.handleNewTask}>
          <input id="description" type="text" placeholder="Description" required></input>
          <input id="location" type="text" placeholder="Location" required></input>
          <input id="author" type="text" placeholder="Author" required></input>
          <input type="submit" value="Add" onClick={this.addTodo}></input>
        </form>
        <div>


          {this.state.taskArray.length ? 
            <table className="taskTableData">
              <thead>
                {this.renderTableHeader()}
              </thead>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
            : 'Currently No Tasks' }
        </div>
      </div>
      );
  }
}
 
export default Tasks;