import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

export class HomePage extends Component {
    state = {
        topics: []
    }

    async componentDidMount(){
        const res = await fetch('/topics'); 
        const result = await res.json();
        this.setState({
            topics : result
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        const search = document.querySelector('input').value;
        fetch(`/topics?search=${search}`)
        .then(res => res.json())
        .then(result => {
            this.setState({
                topics:result
            })
        })
    }

    render() {
        const topics = this.state.topics;
        return (
            <div>
                <form className="form-inline" onChange={this.handleChange} onSubmit={e => { e.preventDefault(); }}>
                    <div className="input-group search-box">            {/* display search box input */}
                        <input type="text" name="search" className="form-control" 
                               placeholder="Search topics..." aria-label="Search for..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>

                <div className="container row topic-list">      {/* display all topics*/}
                    {
                        topics && topics.map(topic => {
                            return (
                                <div className="topic col-12 col-md-6" key = {topic._id}>
                                    <Link to={"/topic/" + topic._id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{topic.name}</h5>
                                            <p className="card-text">{topic.body}</p>
                                          </div>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })
                    }               
                </div>
            </div>
        )
    }
}

export default HomePage
