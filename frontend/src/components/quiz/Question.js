import React, { Component } from 'react'

export class Question extends Component {

    render() {
        const {mcq, index, selectedChoice} = this.props;
        let choiceList = mcq.choices;

        return(
            <div>
                <div className="question-block" key={index}>
                    <label className="question" >Q{index+1}.) {mcq.question}</label>
                    {
                        choiceList && choiceList.map((choice)=>{
                            return(
                                <div className="custom-control custom-radio" key={choice}>
                                    {
                                        (selectedChoice === choice)
                                        ?<input type="radio" id={choice} name={index} className="custom-control-input" 
                                                value={choice} onChange={this.props.handleChange} checked/>
                                        :<input type="radio" id={choice} name={index} className="custom-control-input" 
                                                value={choice} onChange={this.props.handleChange} />
                                    }

                                    <label className="custom-control-label" htmlFor={choice}>{choice}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Question;
