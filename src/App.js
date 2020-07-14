import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hearder from './component/layout/Header'
import Todos from './component/Todos';
import AddTodo from './component/AddTodo';
import About from './component/pages/About';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res=>this.setState({todos: res.data}))
  }

  //Toggle Complete
  markCompleted = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res=>this.setState({ 
      todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    
  }

  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',
    {
      title,
      completed:false
    })
    .then(res=> this.setState({
      todos: [...this.state.todos,res.data]
    }))
  }

  render() {
    //console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Hearder />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markCompleted={this.markCompleted}
                  delTodo={this.delTodo} />

              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
