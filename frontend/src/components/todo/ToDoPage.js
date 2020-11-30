import React from 'react'
import axios from 'axios'
import '../../App.css'
import Paper from '@material-ui/core/Paper';
import Todo from './ToDo';

export default class MainToDo extends React.Component {
  constructor(props) {
    super(props)
    this.addToDoItem = this.addToDoItem.bind(this)
    this.deleteAllItems = this.deleteAllItems.bind(this)
    this.logout = this.logout.bind(this)

    this.state = {
      name: "",
      email: "",
      completedTasks: [],
      task: "",
      searchWord: "",
      hide: false
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

    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getuser`, config)
      .then((res) => {
        this.setState({
          name: res.data.user.username,
          email: res.data.user.email
        })
      })
      .catch((error) => {
        console.log(error.message)
      })

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

  async deleteAllItems() {
    this.setState({ hide: true })

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todo/deleteall`, config)
      .then((res) => {
        console.log('All items deleted')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  async logout() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {} ,config)
      .then((res) => {
        localStorage.removeItem("Authorization")
        window.location = "/login"
      }).catch((error) => {
        console.log(error.message)
      })
  }

  render() {
    const {completedTasks, searchWord} = this.state
    const filteredTodos = completedTasks.filter((item) => item.message.toLowerCase().includes(searchWord.toLowerCase()))

    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg my-5 todo-card-style" >
            <div className="card-body p-0">
              <div className="row">   
                <div className="col-lg-12">
                  <div className="custome-header">
                    <div className="row">
                      <div className="col-8">
                        <h4>{this.state.name}</h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-dark btn-sm" style={{width: '100px'}} 
                          onClick={this.logout}>Logout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <input type="text" className="form-control" placeholder="Search todos" required 
                    onChange={(e) => this.setState({searchWord: e.target.value})}/>
                  </div>
                  <div className={`${this.state.hide ? "d-none" : ""}`}>
                    <ul>
                      {filteredTodos.map((item) => (
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
              <input type="text" className="form-control" placeholder="Add your ToDos here" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" onChange={(e) => this.setState({task: e.target.value})} required/>
              <div className="input-group-append" id="button-addon4">
                <button className="btn btn-info custom-btn" type="submit">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                  </svg>
                </button>

                <button className="btn delete-custome" type="button" data-toggle="tooltip" data-placement="top" title="Remove All ToDos" 
                onClick={this.deleteAllItems}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                </button>
              </div>
            </div>   
          </form>
        </div>
      </div>
    )
  }
}