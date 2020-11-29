import React from 'react'
import axios from 'axios'
import '../../App.css'
import Paper from '@material-ui/core/Paper';
import Todo from './ToDo';

export default class MainToDo extends React.Component {
  constructor(props) {
    super(props)
    this.addToDoItem = this.addToDoItem.bind(this)

    this.state = {
      name: "",
      email: "",
      completedTasks: [],
      incompletedTasks: [],
      task: ""
    }
  }

  async componentDidMount() {
    if (localStorage.getItem("Authorization") === null) {
      window.location = '/login'
    }

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo/gettodos`, config)
      .then((res) => {
        this.setState({
          completedTasks: res.data.todo
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  async addToDoItem(e) {
    e.preventDefault()
    e.target.reset()
    let item = this.state.task
    let todo = { message: item }

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo/addtodo`, todo, config)
      .then((res) => {
        console.log('Item Added')
        this.setState({
          completedTasks: [...this.state.completedTasks, res.data.todo]
        })
      })
  }

  render() {
    return (
      <div className="container">
        {console.log(this.state.completedTasks)}
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg my-5 todo-card-style" >
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-3">
                   
                </div>
                <div className="col-lg-9">
                  <div className="p-3">
                    <input type="text" className="form-control" placeholder="Search todos" required  />
                  </div>
                  <div>
                    <ul>
                      {this.state.completedTasks.map((item) => (
                        <div className="pl-3">
                          <div className="custome-paper">
                            <Todo key={item._id} itemID={item._id} userID={item.userID}  message={item.message} complete={item.complete}
                            />
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={this.addToDoItem} style={{position: "fixed", bottom: 0}}>
            <div className="input-group mb-3 p-3 add-btn">
              <input type="text" className="form-control" placeholder="Add your ToDos here" 
              required onChange={(e) => this.setState({task: e.target.value})} />
              <div className="input-group-append">
                <button className="btn btn-info custom-btn" type="submit" id="button-addon2">ADD</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}