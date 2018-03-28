import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SinglePost extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            post: {
                user: {},
                category: {}
                // comments: {}
            },
            comment: '',
            user_id: ''
        }

        this.deletePost = this.deletePost.bind(this);
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

    deletePost() {
        
        axios.delete(`/api/posts/${this.state.post_id}`).then((response) => {
            this.props.history.push(`/`);            
        }).catch((error) => {
            console.log(error);
        })

    }

    handleInput(key, e) {
        var state = {...this.state.comment}; 
        state[key] = e.target.value;
        this.setState({comment: state.text});
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.post('/api/comments', { 
            text: this.state.comment,
            post_id: this.state.post.id, 
            user_id: localStorage.getItem('id')
        }).then(response => {
            document.getElementById('title').value = '';            
        }).catch(err => {
            console.log(err)
        });
    }


    render() {
        
        const {post} = this.state;
        console.log(post.comments);
        const editBtn = (post.user_id == localStorage.getItem('id'))?
                            ( <Link to={`/posts/${this.state.post_id}/edit`} className="btn btn-dark">Edit</Link> ):
                            undefined;
        const deleteBtn = (post.user_id == localStorage.getItem('id'))?
                            ( <button className="btn btn-dark" onClick={this.deletePost}>Delete</button> ):
                            undefined;   
        const commentForm = (post.user_id != localStorage.getItem('id'))?
                                (
                                    <form onSubmit={this.handleSubmit}>                                          
                                        <div className='form-group'>
                                            <input id="title" className='form-control' type='text' onChange={(e)=>this.handleInput('text',e)} /><br />
                                        </div>                 
                                        <input className='btn btn-dark' type="submit" value="Comment" />
                                    </form>
                                ) :
                                undefined   
        const commentsList = post.comments ?
                            (
                                <div>
                                    <ul>
                                        {
                                            post.comments.map((value, index) => {
                                                return (
                                                    <li key={index}>
                                                        {value.text}<br />
                                                        {value.user.name}<br />
                                                        {value.created_at}
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div> 
                            ) :
                            undefined
                                

        return(
            <div>
                <div className='card'>
                    <h1 className="card-title">{post.title}</h1>
                    <h6>{post.category.name}</h6>
                    <p className='card-text'>{post.text}</p>
                    <h6>Posted by {post.user.name} ({post.created_at})</h6>
                </div><br /><br />
                
                {editBtn}   
                {deleteBtn}   
                {commentForm} <br />
                {commentsList}
                
                     
            </div>
        )
    }

}