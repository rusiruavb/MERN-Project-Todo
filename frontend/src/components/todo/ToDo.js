import React from 'react'
import axios from 'axios'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.setComplete = this.setComplete.bind(this)
    this.deleteItem = this.deleteItem.bind(this)

    this.state = {
      itemID: props.itemID,
      isComplete: props.complete,
      task: props.message,
      hide: 'flex'
    }
  }

  async setComplete() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    if (this.state.isComplete) {
      this.setState({
        isComplete: false
      })

      let complete = {itemID: this.state.itemID, complete: false}
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/markcomplete`, complete, config)
          .then((res) => {
            console.log(res.data.status)
          })
          .catch((error) => {
            console.log(error.message)
          })
    } else {
      this.setState({
        isComplete: true
      })

      let complete = {itemID: this.state.itemID, complete: true}
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/markcomplete`, complete, config)
          .then((res) => {
            console.log(res.data.status)
          })
          .catch((error) => {
            console.log(error.message)
          })
    }
  }

  async deleteItem() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

   this.setState({
     hide: 'none'
   })

   await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todo/deletetodo/${this.state.itemID}`, config)
    .then((res) => {
      console.log('Item deleted')
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  render() {
    return (
      <div className={`d-${this.state.hide} justify-content-start`}>
        <li onClick={this.setComplete} className={`${this.state.isComplete ? "completed": ""} d-flex justify-content-start`} >{this.state.task}
        </li>
        <span>
          <button className={`close`} onClick={this.deleteItem}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash2-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.037 3.225l1.684 10.104A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/>
              <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
            </svg>
          </button>
        </span>
      </div>
    )
  }
}