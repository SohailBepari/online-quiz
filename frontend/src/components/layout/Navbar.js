import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Logo from '../images/quizstock.png'
import './Navbar.css'

export class Navbar extends Component {	
    handleLogOut = (e) => {
        axios.get('/user/logout',{withCredentials: true})
        .then(response => {
            this.props.logout();        //redux logout action
            this.props.history.push('/login');
        });
    }		

    renderLinks(){      //render login or logout links depending on whether user is loggedin or not
        if(this.props.user === undefined){
            return(
                <li className="nav-item py-0">
                    <Link to="/login" className="nav-link">
                        <i className="fa fa-sign-in-alt" aria-hidden="true"></i>&ensp;Log In
                    </Link>
                </li>
            )
        }
        return(
            <li className="nav-item py-0">
                <span onClick={this.handleLogOut} className="nav-link logout">
                    <i className="fa fa-sign-out-alt" aria-hidden="true"></i>&ensp;Log Out
                </span>
            </li>
        )
    }	

	render() {
		return (
            <nav className="navbar navbar-dark bgprimary navbar-expand-lg ">

                <Link className="navbar-brand" to="/">      {/* display quiz logo */}
                  <img src={Logo} alt="logo" height="40px" width = "60px"/>
                </Link>

                {/* display toggle */}
                <button className="navbar-toggler mt-1" type="button" data-toggle="collapse" 
                        data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars"></i>
                </button>

                <div className="navbar-collapse collapse" id="navbarNav">   {/* display navbar links */}
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item py-0">
                            <Link to="/" className="nav-link">
                                <i className="fa fa-home" aria-hidden="true"></i>&ensp;Home
                            </Link>
                        </li>

                        <li className="nav-item py-0">
                            <Link to="/results" className="nav-link">
                                <i className="fa fa-trophy" aria-hidden="true"></i>&ensp;Results
                            </Link>
                        </li>

                        <li className="nav-item py-0">
                            <Link to="/create" className="nav-link">
                            <i className="fa fa-plus" aria-hidden="true"></i>&ensp;Create
                            </Link>
                        </li>

                        <li className="nav-item py-0">
                            <Link to="/signup" className="nav-link">
                                <i className="fa fa-sign-in-alt" aria-hidden="true"></i>&ensp;Sign Up
                            </Link>
                        </li>
                        
                        {this.renderLinks()}
                    </ul>
                </div>  
            </nav>
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
        logout : () => {dispatch({type : 'LOGOUT'})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
