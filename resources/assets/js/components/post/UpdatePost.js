import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Redirect } from 'react-router-dom';

export default class UpdatePost extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            post: '',
            user_id: ''
        }
    }

    componentDidMount() {
        
        axios.get(`/api/posts/${this.state.post_id}`).then((response) => {
            const post = response.data;
            this.setState({post: post[0]});
        }).catch((error) => {
            console.log(error);
        })

    }

    handleInput(key, e) {
        var state = {...this.state.post}; 
        state[key] = e.target.value;
        this.setState({post: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        // axios.put(`/api/posts/${this.state.post_id}`, { 
        //     title: 'lavaaaa'
        // }).then(response => {
        //     this.props.history.push(`/`);
        // }).catch(err => {
        //     console.log(err)
        // });
        
        console.log(this.props.match)
    }

    render() {
        const {post} = this.state;
        const check = post.user_id == localStorage.getItem('id') ?
                    ( <form onSubmit={this.handleSubmit}>
                        <h3>Create post</h3>
                        <div className='form-group'>
                                                    <label for="title">Title</label>
                                                    <input id="title" className='form-control' type='text' value={post.title} onChange={(e)=>this.handleInput('title',e)} /><br />
                        </div>
                        <div className='form-group'>
                                                    <label for="text">Text</label>
                                                    <textarea id='text' rows="12" className='form-control' value={post.text} onChange={(e)=>this.handleInput('text',e)}></textarea><br />                  
                        </div>                   
                        <input className='btn btn-dark' type="submit" value="Add" />
                    </form> ) :
                    (<div><h1> You are not authorised </h1>
                    <br/>
                    <a href="/" className='btn btn-dark'>Home page</a></div>)
        
        return(
            <div>
                <Navbar />
                {check}
            </div>
        )
    }

}