import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default class SinglePost extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.match.params.id,
            post: '',
            user_id: ''
        }

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        
        axios.get(`/api/posts/${this.state.post_id}`).then((response) => {
            const post = response.data;
            this.setState({post: post[0]});
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

    render() {
        const {post} = this.state;
        const editBtn = (post.user_id == localStorage.getItem('id'))?
                            ( <Link to={`/posts/${this.state.post_id}/edit`} className="btn btn-dark">Edit</Link> ):
                            undefined;
        const deleteBtn = (post.user_id == localStorage.getItem('id'))?
                            ( <button className="btn btn-dark" onClick={this.deletePost}>Delete</button> ):
                            undefined;                    

        return(
            <div>
                <Navbar />

                <div className='card'>
                    <h1 className="card-title">{post.title}</h1>
                    <p className='card-text'>{post.text}</p>
                    <h6>Posted by {post.name} ({post.created_at})</h6>
                </div><br /><br />
                
                {editBtn}   
                {deleteBtn}             
            </div>
        )
    }

}