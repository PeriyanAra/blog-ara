import React, { Component } from 'react';
import Navbar from '../Navbar';

export default class SinglePost extends Component { 
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
            console.log(post)
        }).catch((error) => {
            console.log(error);
        })

    }

    render() {
        const {post} = this.state;
        const editBtn = post.user_id == localStorage.getItem('id') ?
                            ( <a className="btn btn-dark" href={`/posts/${this.state.post_id}/edit`}>Edit</a> ):
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
            </div>
        )
    }

}