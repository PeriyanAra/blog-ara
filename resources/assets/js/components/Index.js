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
import UsersList from './users/UsersList';
import SingleUser from './users/SingleUser';
import UpdateUser from './users/UpdateUser';
import CategoriesList from './category/CategoriesList';
import CreateCategory from './category/CreateCategory';
import UpdateCategory from './category/UpdateCategory';

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
                                    <h1>All posts</h1>
                                    { addBtn }

                                    <div>
                                        {posts.map((value, index) => {
                                            return (
                                                <div className='card' key={ index }>
                                                    <h2 className='card-title'><a href={`/posts/${value.id}`}>{ value.title }</a></h2>
                                                    <h5>{ value.category.name }</h5>
                                                    <p className='card-body'>{ value.text }</p>
                                                    <h6>Created by <a href={`/users/${value.user.id}`}>{ value.user.name }</a></h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
        );
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(
    (<Router> 
        <div> 
        <Navbar />      
        <Switch>
            {/* Post routes */}
            <Route exact path='/' component={ Index } />
            <Route exact path='/posts' component={ Index }/>
            <Route exact path='/posts/create' component={ CreatePost } /> 
            <Route exact path='/posts/:id' component={ SinglePost } />   
            <Route exact path='/posts/:id/edit' component={ UpdatePost } />        
            {/* Auth routes */}
            <Route exact path='/register' component={ RegisterForm } />
            <Route exact path='/login' component={ LoginForm } />
            {/* Users routes */}
            <Route exact path='/users' component={ UsersList }/>
            <Route exact path='/users/:id' component={ SingleUser }/>
            <Route exact path='/users/:id/edit' component={ UpdateUser } />
            {/* Categories routes */}
            <Route exact path='/categories' component={ CategoriesList }/>
            <Route exact path='/categories/:id/edit' component={ UpdateCategory }/>
            <Route exact path='/categories/create' component={ CreateCategory }/>            
        </Switch>
        </div>
    </Router>), document.getElementById('root'));    
}