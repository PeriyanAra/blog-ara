import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategory: {
                name: ''
            }
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.ifAdmin = this.ifAdmin.bind(this);
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

    handleInput(key, e) {
        var state = {...this.state.newCategory}; 
        state[key] = e.target.value;
        this.setState({newCategory: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.post('/api/categories', { 
            name: this.state.newCategory.name
        }).then(response => {
            this.props.history.push(`/categories`);
        }).catch(err => {
            console.log(err)
        });
    }

    componentDidMount(){
        this.ifAdmin();
    }
    
    render(){
        const result = this.state.admin ?
                            (
                                <div>
                                    <form onSubmit={this.handleSubmit}>
                                        <h3>Create Category</h3>
                                        <div className='form-group'>
                                            <label htmlFor="name">Name</label>
                                            <input id="name" className='form-control' type='text' onChange={(e)=>this.handleInput('name',e)} /><br />
                                        </div>                  
                                        <input className='btn btn-dark' type="submit" value="Add" />
                                    </form>
                                </div>
                            ) :
                            (<h2>You are not authed!!!</h2>)
                
        return (
            <div>
                {result}
            </div>
        )
    }
 }