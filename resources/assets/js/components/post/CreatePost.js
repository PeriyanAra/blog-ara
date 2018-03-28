import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPost: {
                title: '',
                text: '',
                category_id: ''
            },
            categories: []
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        axios.get('/api/categories').then((response) => {
            const categories = response.data;
            this.setState({categories});             
        }).catch((error) => {

        })
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
            category_id: this.state.newPost.category_id, 
            user_id: localStorage.getItem('id')
        }).then(response => {
            this.props.history.push(`/`);
        }).catch(err => {
            console.log(err)
        });
        // console.log(this.state.newPost.category_id);
    }
    
    render(){
        const {categories} = this.state;
        console.log(categories);
        const el = localStorage.getItem('token') ?
                                    (<div>
                                        <form onSubmit={this.handleSubmit}>
                                            <h3>Create post</h3>
                                            <div className='form-group'>
                                                <label htmlFor="category">Category</label>
                                                <select className="custom-select" id='category' onChange={(e)=>this.handleInput('category_id',e)}>
                                                    {
                                                        categories.map((value, index) => {
                                                            return (
                                                                <option value={value.id} key={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
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