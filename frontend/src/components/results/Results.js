import React, { Component } from 'react'
import './Results.css'

export class Results extends Component {

    renderResult = (userAnswer, correctAnswer, explaination, marksObj) => { //render result of a single question
        if(userAnswer === correctAnswer){
            marksObj.correctAnswers++;                
            return (   
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">
                        <i className="fa fa-check" aria-hidden="true"></i>
                        &ensp;Correct Answer!                  {/* &ensp is used to give a space */}
                    </h4>
                    <p>Answer - {correctAnswer}</p>
                    <h5>Explaination</h5>
                    <p>{explaination}</p>
                </div>
            )
        }
        else{
            return(
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">
                        <i className="fa fa-times" aria-hidden="true"></i>
                        &ensp;Wrong Answer
                    </h4>
                    <p>Your Answer - {userAnswer}</p>
                    <hr/>
                    <p className="mb-0">Correct Answer - {correctAnswer}</p><br/>
                    <h5>Explaination</h5>
                    <p>{explaination}</p>
                </div>
            )
        }
    }

    renderMarks = (marksObj) => {                           //render marks achieved
        const {correctAnswers,totalQuestions} = marksObj;
        const percentage = correctAnswers*100/totalQuestions;
        let message = "";
        let alertClass = "";
        if(percentage >= 75){
            message = "Excellent!";
            alertClass = "alert-success";
        }
        else if(percentage >= 40){
            message = "Not Bad";
            alertClass = "alert-warning";
        }
        else{
            message = "Better Luck Next Time";
            alertClass = "alert-danger";
        }
        return(
                <div className={"alert " + alertClass} role="alert">
                    <h4 className="alert-heading">
                        Result - {message}
                    </h4>
                    <h5>Marks - {correctAnswers}/{totalQuestions}</h5>
                </div>
        )
    }
    
    render() {
        const {topic, answers} = this.props;
        const quiz = topic.quiz;
        let marksObj = {
            correctAnswers: 0,
            totalQuestions : quiz.length
        };

        return (
            <div className="">
                <div className="row justify-space-around">
                {
                    quiz && quiz.map((mcq,index) => {
                        const choiceList = mcq.choices;
                        return(
                            <div key={index} className="col-12 col-md-6">
                                <div className="question-block-results">
                                    <p className="question" >Q{index+1}.) {mcq.question}</p>
                                    {
                                        choiceList && choiceList.map((choice)=>{
                                            return(
                                                <p key={choice}>{choice}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div className="answer-block">
                                    {this.renderResult(answers[index], mcq.answer, mcq.explaination,marksObj)}
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="marks-block">
                    {this.renderMarks(marksObj)}
                </div>
            </div>
        )
    }
}

export default Results
