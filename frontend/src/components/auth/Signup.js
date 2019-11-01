import React, { Component } from 'react'

class Signup extends Component {
    state = {
        username: '',
        email:'',
        password: '',
        confirmPassword : '',
        error_msg: ''
    }
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
          this.setState({
            error_msg: 'Passwords do not match'
          })
          return;
        }
        fetch('/user/signup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "username": this.state.username,
             "email": this.state.email,
             "password" : this.state.password
            })
        })
        .then(res => {
          if(res.status === 403){
            this.setState({
              error_msg: 'Same email already exists'
            })
          }
          else{
              alert("Account created");
              this.props.history.push('/login');
          }
      })
        
    }
    handleCancel = e => {
      this.setState({
        error_msg : ''
      })
    }
    render() {
        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 col-sm-8 mt-5 bg-light rounded">

                <h1 className="text-center font-weight-bold text-primary">Register</h1>
                <hr className="bg-light"/>
                <form id="form-box" className="p-2" onSubmit={this.handleSubmit}>

                  {this.state.error_msg !== '' ? (    //display signup error
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {this.state.error_msg}
                    <button type="button" class="close" data-dismiss="alert" 
                    aria-label="Close" onClick={this.handleCancel}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                  ): null}

                  <div className="form-group input-group">    {/* display username input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>
                    <input type="text" name="username" className="form-control" 
                    placeholder="Enter your name" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group input-group">    {/* display email input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    </div>
                    <input type="email" name="email" className="form-control" 
                    placeholder="Enter your email" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group input-group">    {/* display password input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-at"></i></span>
                    </div>
                    <input type="password" name="password" className="form-control" 
                    placeholder="Enter password" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group input-group">    {/* display confirm password input */}
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-at"></i></span>
                    </div>
                    <input type="password" name="confirmPassword" className="form-control" 
                    placeholder="Confirm password" onChange={this.handleChange} required/>
                  </div>

                  <div className="form-group">
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

export default Signup
