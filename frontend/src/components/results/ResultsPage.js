import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

export class ResultsPage extends Component {
    state = {
        topics : []
    }

    componentDidMount(){
        if(this.props.user !== undefined){
            axios.get(`/results`, {withCredentials : true})
            .then(response => {
                this.setState({
                topics : response.data
            }); 
        })  
        }    
    }
    
    render() {
        if(this.props.user === undefined){
            alert("Sign in");
            return(
                <Redirect to="/login"/>
            )
        }
        console.log(this.props.user);
        const topics = this.state.topics;
        return (
            <div className="container row topic-list">
                    {
                        topics && topics.map(topic => {
                            return (
                                <div className="topic col-12 col-md-6" key = {topic._id}>
                                    <Link to={"/results/" + topic._id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Result Of {topic.name}</h5>
                                            <p className="card-text">{topic.body}</p>
                                          </div>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                    }               
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user : state.user
    }
}
export default connect(mapStateToProps)(ResultsPage);
