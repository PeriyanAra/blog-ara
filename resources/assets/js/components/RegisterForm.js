import React, { Component } from 'react';

export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                name: '',
                email: '',
                password: ''
            },
            registered: false
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        var state = {...this.state.newUser}; 
        state[key] = e.target.value;
        this.setState({newUser: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.post('/api/register', { 
            name: this.state.newUser.name, email: this.state.newUser.email, password: this.state.newUser.password 
        }).then(response => {
            this.props.history.push(`/`);
        }).catch(err => {
            console.log(err)
        });
        //console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Register form</h3>

                    <input placeholder='name' type='text' onChange={(e)=>this.handleInput('name',e)} /><br />
                    <input placeholder='email' type='email' onChange={(e)=>this.handleInput('email',e)} /><br />
                    <input placeholder='password' type='password' onChange={(e)=>this.handleInput('password',e)} /><br />

                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }

}