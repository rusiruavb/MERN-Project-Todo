import React, {useState} from 'react'
import Button from "@material-ui/core/Button"
import SendIcon from '@material-ui/icons/Send'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onFormSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, user)
      .then((res) => {
        localStorage.setItem("Authorization", res.data.token)
        window.location = '/'
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center custom-margin">
        <div className="card shadow-lg my-5 card-style" >
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="p-3">
                  <h1 className="h2 text-gray-900 mb-4">Login Here</h1>

                  <form onSubmit={onFormSubmit}>
                    <div className="form-group mb-3">
                      <input type="email" 
                        className="form-control form-control-user" 
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                      <input type="password" 
                        className="form-control form-control-user" 
                        placeholder="Enter new password"
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%", marginTop: '30px'}}
                        startIcon={<SendIcon />} disableElevation type="submit">login to my account</Button>
                  </form>
                  <div style={{paddingTop: '12px'}}>
                    <Link to="/signup">Create new Account</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login