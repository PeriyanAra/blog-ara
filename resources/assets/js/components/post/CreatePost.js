import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from '../Navbar';
import { Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPost: {
                title: '',
                text: ''
            }
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        var state = {...this.state.newPost}; 
        state[key] = e.target.value;
        this.setState({newPost: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.post('/api/posts', { 
            title: this.state.newPost.title, 
            text: this.state.newPost.text, 
            user_id: localStorage.getItem('id')
        }).then(response => {
            this.props.history.push(`/`);
        }).catch(err => {
            console.log(err)
        });
    }
    
    render(){
        const el = localStorage.getItem('token') ?
                                    (<div>
                                        <Navbar />

                                        <form onSubmit={this.handleSubmit}>
                                            <h3>Create post</h3>
                                            <div className='form-group'>
                                                <label htmlFor="title">Title</label>
                                                <input id="title" className='form-control' type='text' onChange={(e)=>this.handleInput('title',e)} /><br />
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="text">Text</label>
                                                <textarea id='text' rows="12" className='form-control' onChange={(e)=>this.handleInput('text',e)}></textarea><br />                  
                                            </div>                   
                                            <input className='btn btn-dark' type="submit" value="Add" />
                                        </form>
                                    </div>) :
                                    ( <Redirect to="/" /> )
                
        return (
            <div>
                {el}
            </div>
        )
    }
 }