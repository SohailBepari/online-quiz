import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import ReactCountdownClock from 'react-countdown-clock'
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"
import Results from '../results/Results.js'
import Question from './Question.js'
import './Quiz.css'

export class Quiz extends Component {

    state = {
        topic : {},
        answers : [],
        nextIndex : 0,
        loadResults: false,
        error_msg : '',
        timer : 90
    } 

    componentDidMount(){
        const topicId = this.props.match.params.id;
        axios.get(`/topics/${topicId}`)
        .then(response => {
            this.setState({
                topic : response.data
            }); 
        })      
        if(this.props.user !== undefined)       //without this if statement, there was a bug when user was not 
            this.detectSwipe("questionId", this.detectSwipeUtil);    //signed in and was clicking on the quiz hence 
    }                                           // "questionId" was an invalid id 
    
    handleChange = (e) => {                     //to change quiz answer in state
        let {answers} = this.state;
        let newAnswers = answers;
        newAnswers[e.target.name] = e.target.value;
        this.setState({
            answers : newAnswers
        })
    }

    handleSubmit = (e) => {  
        if(e !== undefined)                   //to handle submission of quiz
            e.preventDefault();
        const {topic, answers} = this.state;
        let isEveryAnswerMarked = true;
        for(let i = 0; i < topic.quiz.length; i++){     //check if any answer not attempted
            if(answers[i] === undefined){
                isEveryAnswerMarked = false;
                break;
            }
        }
        if(e === undefined      //when user didnt press submit button and timer runs out
           || (isEveryAnswerMarked === false && window.confirm("You have not attempted every question, Are you sure you want to submit?"))
           || (isEveryAnswerMarked === true && window.confirm("Are you sure you want to submit the entire quiz?")) ){
            axios.post(`/results`, {                //store result in database
                "name" : topic.name,
                "id" : topic._id,
                "body" : topic.body,
                answers,
                "email" : this.props.user.email
            })
            this.setState({ 
                loadResults : true
            })
        }
    }

    handleNext = e => {              //to handle next button
        if(e !== undefined)         //e is undefined when handleNext is called explicitly inside detectSwipeUtil
            e.preventDefault();
        if(this.state.error_msg === 'This is the first question')   //remove first question error when user presses next
            this.setState({
                error_msg : ''
            })
        const quizSize = this.state.topic.quiz.length;
        let nextIndex = this.state.nextIndex;
        if(nextIndex + 1 >= quizSize){
            this.setState({
                error_msg: 'End of Quiz reached'
            })
        }
        else{
            this.setState({
                nextIndex : nextIndex+1
            })
        }
    }
    handlePre = e => {              //to handle previous button 
        if(e !== undefined)
            e.preventDefault();
        if(this.state.error_msg === 'End of Quiz reached')  //remove end of quiz error when user presses previous    
            this.setState({
                error_msg : ''
            })
        let nextIndex = this.state.nextIndex;
        if(nextIndex === 0)
            this.setState({
                error_msg: 'This is the first question'
            })
        else
            this.setState({
                nextIndex : nextIndex-1
            })
    }

    handleCancel = e => {           //when user presses cancel button inside dismissable bootstrap btn
        this.setState({
          error_msg : ''
        })
    }

    detectSwipe(el,func) {      //to detect swipe in touch devices, el=>elementId in which swipe is to be detected
        let swipe_det = {};
        swipe_det.sX = 0; swipe_det.sY = 0; 
        swipe_det.eX = 0; swipe_det.eY = 0;

        let min_x = 30;  //min x swipe for horizontal swipe
        let max_y = 60;  //max y difference for horizontal swipe
        let direc = "";

        let ele = document.getElementById(el);

        ele.addEventListener('touchstart',function(e){
          var t = e.touches[0];
          swipe_det.sX = t.screenX; 
          swipe_det.sY = t.screenY;
        },false);

        ele.addEventListener('touchmove',function(e){
          e.preventDefault();
          var t = e.touches[0];
          swipe_det.eX = t.screenX; 
          swipe_det.eY = t.screenY;    
        },false);

        ele.addEventListener('touchend',function(e){
          //horizontal detection
          if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) 
          && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
            if(swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
          }
          if (direc !== "") {
            if(typeof func == 'function') func(el,direc);
          }
          direc = "";
          swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
        },false);  
    }

    detectSwipeUtil = (el,d) => {
        if(d === 'l')
            this.handleNext();      //simulate next when user left swipes
        else if(d === 'r')
            this.handlePre();       //simulate previous when user right swipes
    }

    render() {
        if(this.props.user === undefined){      //user not logged in
            alert("Sign in");
            return(
                <Redirect to="/login"/>
            )
        }
        const {loadResults, nextIndex,topic, answers, timer} = this.state;
        const quiz = topic.quiz;
        let mcq;
        if(quiz !== undefined)
            mcq = this.state.topic.quiz[nextIndex];
        if(loadResults === false){
            return (
                <div className="container" id="questionId">
                  <form>
                      { mcq ? (
                        <div>

                            {<ReactCountdownClock seconds={timer} color="#ff3b43 " alpha={1} size={50} onComplete={this.handleSubmit}/>}

                            {this.state.error_msg !== '' ? (        //display quiz errors
                            <div className="alert-block alert alert-danger alert-dismissible fade show" role="alert">
                              {this.state.error_msg}
                              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleCancel}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            ): null}

                            <Progress percent={(nextIndex*100)/(topic.quiz.length-1)} className="progress-block"
                                      status="success" theme={{success: {color: '#fbc630'}}}/>

                            <Question mcq = {mcq} index = {nextIndex} selectedChoice = {answers[nextIndex]} handleChange = {this.handleChange}/>
                            
                            <div className="row justify-content-center mt-4 button-block">

                              <div className="col">     {/* display next and pre input */}        
                                <button className="btn mt-4 bg-warning" onClick={this.handlePre}>
                                  <i className="fa fa-angle-double-left" value="next" aria-hidden="true"></i>
                                </button>&ensp;

                                <button className="btn mt-4 bg-warning previous" onClick={this.handleNext}>
                                  <i className="fa fa-angle-double-right" value="previous" aria-hidden="true"></i>
                                </button>
                              </div>

                              <div className="col">     {/* display submit button */}
                                <button className="btn mt-4 bg-warning submit" onClick = {this.handleSubmit}>
                                  Submit &ensp;
                                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                              </div>
                            </div>
                        </div>
                        )
                        : null
                      }
                    </form>
                </div>
            )
        }
        else{           // display result after quiz submission
            const {topic, answers} = this.state;
            return(
                <Results topic={topic} answers={answers}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      user : state.user
    }
}
export default connect(mapStateToProps)(Quiz);
