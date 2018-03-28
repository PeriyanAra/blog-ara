import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UpdatePost extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            post: {
                user: {},
                category: {}
            },
            user_id: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        
        axios.get(`/api/posts/${this.state.post_id}`).then((response) => {
            const post = response.data;
            this.setState({post: post});
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
        axios.put(`/api/posts/${this.state.post_id}`, { 
            title: this.state.post.title,
            text: this.state.post.text,
        }).then(response => {
            this.props.history.push(`/`);
        }).catch(err => {
            console.log(err)
        });
        console.log(this.state.newPost)
    }

    render() {
        const {post} = this.state;
        const {categories} = this.state;
        const check = post.user.id == localStorage.getItem('id') ?
                    ( <form onSubmit={this.handleSubmit}>
                        <h3>Update post</h3>
                        <div className='form-group'>
                                                    <label htmlFor="title">Title</label>
                                                    <input id="title" className='form-control' type='text' value={post.title} onChange={(e)=>this.handleInput('title',e)} /><br />
                        </div>
                        <div className='form-group'>
                                                    <label htmlFor="text">Text</label>
                                                    <textarea id='text' rows="12" className='form-control' value={post.text} onChange={(e)=>this.handleInput('text',e)}></textarea><br />                  
                        </div>                   
                        <input className='btn btn-dark' type="submit" value="Add" />
                    </form> ) :
                    (<div><h1> You are not authorised </h1>
                    <br/>
                    <a href="/" className='btn btn-dark'>Home page</a></div>)
        
        return(
            <div>
                {check}
            </div>
        )
    }

}