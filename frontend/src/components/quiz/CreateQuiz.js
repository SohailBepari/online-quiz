import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './CreateQuiz.css'

export class CreateQuiz extends Component {
    state = {
        quiz: []
    } 

    handleNext = () => {

        const question = document.querySelector('input[placeholder="Question"]');
        const optionElement1 = document.querySelector('input[placeholder="Option 1"]');
        const optionElement2 = document.querySelector('input[placeholder="Option 2"]');
        const optionElement3 = document.querySelector('input[placeholder="Option 3"]');
        const optionElement4 = document.querySelector('input[placeholder="Option 4"]');
        const answer = document.querySelector('input[placeholder="Answer"]');
        const explaination = document.querySelector('textarea[placeholder="Answer Explaination"]');

        let newQuiz = this.state.quiz;
        newQuiz.push({
            "question" : question.value,
            "choices"  : [optionElement1.value, optionElement2.value, optionElement3.value, optionElement4.value] ,
            "answer" : answer.value,
            "explaination" : explaination.value
        });
        console.log(newQuiz);
        this.setState({
            quiz : newQuiz
        });

        question.value = optionElement1.value = optionElement2.value = "";
        optionElement3.value = optionElement4.value = answer.value = explaination.value = "";
    }

    handleSubmit = e => {
        e.preventDefault();
        this.handleNext();

        const name = document.querySelector('input[placeholder="Topic name..."]').value;
        const body = document.querySelector('input[placeholder="Description of topic..."]').value;
        const quiz = this.state.quiz;
        const finalObject = {
            name, body, quiz
        }

        fetch('/create', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(finalObject)
        })
        .then(res => {
            if(res.status === 403){
                alert("Same topic exists");
                window.location.reload();
            }
            else{
                alert("Quiz created");
                this.props.history.push('/');
            }
        })
    }

    render() {
        if(this.props.user === undefined){
            alert("Sign in");
            return(
                <Redirect to="/login"/>
            )
        }
        return (
             <div className="container"> 
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-8 col-xl-6">

                        <div className="row justify-content-center">    {/* display heading */}
                            <div className="col text-center heading">
                                <h2>Create Quiz&ensp;<i className="fas fa-question-circle"></i></h2>
                            </div>
                        </div>

                        <div className="row align-items-center">        {/* display name input */}
                            <div className="col col-md-8 mt-4">
                                <input type="text" className="form-control" placeholder="Topic name..."/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4">   {/* display description input */}
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Description of topic..."/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4 quiz">  {/* display question input */}
                            <div className="col col-md-10">
                                <input type="text" className="form-control" placeholder="Question"/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4 quiz">  {/* display option 1 and 2 input */}
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Option 1"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Option 2"/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4 quiz">  {/* display option 3 and 4 input */}
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Option 3"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Option 4"/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4 quiz">  {/* display answer input */}
                            <div className="col col-md-8">
                                <input type="text" className="form-control" placeholder="Answer"/>
                            </div>
                        </div>

                        <div className="row align-items-center mt-4 quiz">  {/* display explaination input */}
                            <div className="col">
                                <textarea  className="form-control" placeholder="Answer Explaination"/>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-4">
                            <div className="col">                           {/* display next button */}
                                <button className="btn mt-4 bg-warning" onClick={this.handleNext}>
                                    Next Question &ensp; 
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="col">                           {/* display submit button */}
                                <button className="btn mt-4 bg-warning submit" onClick = {this.handleSubmit}>
                                    Submit &ensp;
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
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
export default connect(mapStateToProps)(CreateQuiz);
