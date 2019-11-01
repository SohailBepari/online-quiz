import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Results from './Results.js'

export class ResultUtil extends Component {
    state = {
        answers : [],
        topicName : '',
        topic : null
    }

    componentDidMount(){
        if(this.props.user !== undefined){
            const topicId = this.props.match.params.id;
            axios.get(`/results/${topicId}`, {withCredentials : true})
            .then(response => {
                this.setState({
                    answers : response.data.answers,
                    topicName : response.data.name
                });
            })
            .then(() => {
                axios.get(`/topics/name/${this.state.topicName}`)
                .then(response => {
                    this.setState({
                        topic : response.data
                    });  
                })
                console.log("alsoResults",this.state); 
            })
        }    
    }
    
    render() {
        console.log(this.props);
        if(this.props.user === undefined){
            alert("Sign in");
            return(
                <Redirect to="/login"/>
            )
        }
        const {topic, answers} = this.state;
        if(topic !== null)
            return (
                <Results topic={topic} answers={answers}/>
            )
        else
                return null;
    }
}

const mapStateToProps = (state) => {
    return {
      user : state.user
    }
}
export default connect(mapStateToProps)(ResultUtil);