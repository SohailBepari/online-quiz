import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Login extends Component {
    state = {
        email: '',
        password: '',
        error_msg: ''
    }

    handleChange = e => {   //change state whenever email or password changes
        this.setState({
            [e.target.name] : e.target.value
        })
    } 

    handleSubmit = e => {
        e.preventDefault();
        axios({
          method: 'post',
          url: '/user/login',
          data: {
            "email": this.state.email,
            "password" : this.state.password,
          },
          withCredentials: true
        })
        .then(response => {
          if(response.data.user !== null){
            this.props.login(response.data.user);
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(err.response);
          if(err.response)
            this.setState({
              error_msg: 'Incorrect email or password'
            })
        });
    }

    handleCancel = e => {   //handle cancel button of dismissable bootstrap error 
      this.setState({
        error_msg : ''
      })
    }
    
    render() {
        return (
          <div className="container">
            <div className="row justify-content-center form-login">
              <div className="col-md-5 col-sm-8 mt-5 bg-light rounded">

                <h1 className="text-center font-weight-bold text-primary">Log In</h1>
                <hr className="bg-light"/>
                <form onSubmit={this.handleSubmit} id="form-box" className="p-2">

                  {this.state.error_msg !== '' ? (      //to display login error
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.error_msg}
                    <button type="button" class="close" data-dismiss="alert" 
                    aria-label="Close" onClick={this.handleCancel}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                  ): null}  

                  <div className="form-group input-group">  {/* display email input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    </div>
                    <input type="email" name="email" className="form-control" 
                    placeholder="Enter your email" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group input-group">  {/* display password input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-at"></i></span>
                    </div>
                    <input type="password" name="password" className="form-control" 
                    placeholder="Enter password" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group">              {/* display submit button */}
                    <input type="submit" name="submit" id="submit" 
                    className="btn btn-primary btn-block" value="Submit"/>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      login : (user) => {dispatch({type : 'LOGIN', user})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
