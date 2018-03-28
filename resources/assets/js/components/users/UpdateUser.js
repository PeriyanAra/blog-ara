import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UpdateUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.match.params.id,
            user: '',
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

    componentDidMount(){
        this.ifAdmin();

        axios.get(`/api/users/${this.state.user_id}`).then((response) => {
            const user = response.data.resource.user;
            this.setState({user: user});
        }).catch((error) => {
            console.log(error);
        })
    }

    handleInput(key, e) {
        var state = {...this.state.user}; 
        state[key] = e.target.value;
        this.setState({user: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.put(`/api/users/${this.state.user_id}`, { 
            name: this.state.user.name,
            email: this.state.user.email
        }).then(response => {
            this.props.history.push(`/`);
        }).catch(err => {
            console.log(err)
        });
        
    }

    render() {  
        const {user} = this.state;
        let result = '';
        
        if(this.state.admin || this.state.user_id == localStorage.getItem('id')) {
            result = ( <form onSubmit={this.handleSubmit}>
                            <h3>Update user</h3>
                            <div className='form-group'>
                                                        <label htmlFor="name">Name</label>
                                                        <input id="name" className='form-control' type='text' value={user.name} onChange={(e)=>this.handleInput('name',e)} /><br />
                            </div>
                            <div className='form-group'>
                                                        <label htmlFor="email">Email</label>
                                                        <input id="email" className='form-control' type='text' value={user.email} onChange={(e)=>this.handleInput('email',e)} />                  
                            </div>                   
                            <input className='btn btn-dark' type="submit" value="Add" />
                        </form> );
        }
        else{
            result = (
                <div>
                    <h1> You are not authorised </h1>
                    <br/>
                    <a href="/" className='btn btn-dark'>Home page</a>
                </div>
            );
        }
        
        return(
            <div>
                {result}
            </div>
        )
    }

}