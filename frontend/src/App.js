import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Navbar from './components/layout/Navbar.js'
import Home from './components/layout/Home.js'
import Signup from './components/auth/Signup.js'
import Login from './components/auth/Login.js'
import Quiz from './components/quiz/Quiz.js'
import CreateQuiz from './components/quiz/CreateQuiz.js'
import ResultsPage from './components/results/ResultsPage.js'
import './App.css'
import ResultUtil from './components/results/ResultUtil.js'

class App extends React.Component {
  componentDidMount(){
    console.log("App mount");
    axios.get('/user',{withCredentials: true})
    .then(response => {
      console.log(response);
      if(response.data.user !== null)
        this.props.login(response.data.user);
    });
  }
  render(){
    return (
    <div className="App">
      <Router>
        <Route path="/" component={Navbar}/>
        <Route exact path = "/" component={Home}/>
        <Route exact path = "/signup" component={Signup}/>
        <Route exact path = "/login" component={Login}/>
        <Route exact path = "/results" component={ResultsPage}/>
        <Route exact path = "/results/:id" component={ResultUtil}/>
        <Route exact path = "/topic/:id" component={Quiz}/>
        <Route exact path = "/create" component={CreateQuiz}/>
      </Router>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      login : (user) => {dispatch({type : 'LOGIN', user})}
  }
}
export default connect(null, mapDispatchToProps)(App)
