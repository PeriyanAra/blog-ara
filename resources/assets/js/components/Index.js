import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Axios from 'axios';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Navbar from './Navbar';
import CreatePost from './post/CreatePost';
import SinglePost from './post/SinglePost';
import UpdatePost from './post/UpdatePost';

export default class Index extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
            axios.get('/api/posts').then((response) => {
                const posts = response.data;
                this.setState({posts: posts});   
                console.log(posts);             
            }).catch((error) => {
    
            })

    }    
    
    render() {  
        const {posts} = this.state;
        const addBtn = localStorage.getItem('token') ?
                                        (<a href="/posts/create" className='btn btn-dark'>Add post</a>) :
                                        undefined
        return (
            this.state.posts && <div>
                                    <Navbar />

                                    <h1>All posts</h1>
                                    { addBtn }

                                    <div>
                                        {posts.map((value, index) => {
                                            return (
                                                <div className='card' key={ index }>
                                                    <h2 className='card-title'><a href={`/posts/${value.post_id}`}>{ value.title }</a></h2>
                                                    <p className='card-body'>{ value.text }</p>
                                                    <h6>Created by { value.name }</h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
        );
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<Router>
        <Switch>
            <Route exact path='/' component={ Index } />
            <Route exact path='/posts' component={ Index }/>
            <Route exact path='/posts/create' component={ CreatePost } /> 
            <Route exact path='/posts/:id' component={ SinglePost } />   
            <Route path='/posts/:id/edit' component={ UpdatePost } />        
            <Route path='/register' component={ RegisterForm } />
            <Route path='/login' component={ LoginForm } />
        </Switch>
    </Router>, document.getElementById('root'));
}