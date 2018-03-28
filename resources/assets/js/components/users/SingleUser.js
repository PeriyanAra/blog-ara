import React, { Component } from 'react';

export default class SingleUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.match.params.id,
            user: '',
            posts: []
        }

        this.ifAdmin = this.ifAdmin.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    ifAdmin() {
        if(localStorage.getItem('id')){
            axios.post('/api/ifAdmin', {
                id: localStorage.getItem('id')
            })
            .then((response) => {
                response.data == 'admin' ? this.setState({admin: true}) : this.setState({admin: false})
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    componentDidMount() {

        this.ifAdmin();
        
        axios.get(`/api/users/${this.state.user_id}`).then((response) => {
            const user = response.data.resource.user;
            const posts = response.data.resource.posts;
            this.setState({user: user, posts: posts});
        }).catch((error) => {
            console.log(error);
        })

    }

    deletePost() {
        
        axios.delete(`/api/users/${this.state.user_id}`).then((response) => {
            this.props.history.push(`/`);
        }).catch((error) => {
            console.log(error);
        })

    }

    render() {  
        const {user} = this.state;  
        const posts = this.state.posts.length > 0 ?
                        (
                            <div>
                                <h4>Posts created by <b>{user.name}</b></h4>
                                <div>
                                    {this.state.posts.map((value, index) => {
                                        return (
                                            <div className='card' key={ index }>
                                                <h5 className='card-title'><a href={`/posts/${value.id}`}>{ value.title }</a></h5>
                                                <p className='card-body'>{ value.text }</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) :
                        ( <h4><b>{user.name}</b> doesn't have any posts</h4> );
        
        const adminBtns = this.state.admin ?
                                (
                                    <div>
                                        <a className='btn btn-dark' href={`/users/${user.id}/edit`}>Edit</a>
                                        <button className="btn btn-dark" onClick={this.deletePost}>Delete</button>
                                    </div>
                                ) :
                                undefined;

        return(
            <div>
                <div className="card border-secondary mb-3">
                    <div className="card-header"><h2>{user.name}</h2></div>
                    <div className="card-body">
                        <h5 className="card-title">Email: {user.email}</h5>
                        <h5 className="card-title">Registered: {user.created_at}</h5>
                        {adminBtns}
                    </div>
                </div><br />

                {posts}    
            </div>
        )
    }

}