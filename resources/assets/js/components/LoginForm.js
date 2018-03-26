import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Navbar from './Navbar';


export default class Login extends Component {
   constructor(props){
       super(props);
       this.state = {
           email: '',
           password: '',
       }
       this.submit = this.submit.bind(this);
       this.email = this.email.bind(this);
       this.password = this.password.bind(this);
   }

   submit(e){
       e.preventDefault();

       let data = JSON.stringify({
           password: this.state.password,
           email: this.state.email
       })

       axios.post(`api/auth`, data, {
           headers: {
               'Content-Type': 'application/json',
           }
       })
       .then(res => {
           localStorage.setItem("name", res.data.user.name);
           localStorage.setItem("id", res.data.user.id);
           localStorage.setItem("token", res.data.token);
           this.props.history.push(`/`);
       })
   }

   email(e){
       this.setState({email: e.target.value});
   }

   password(e){
       this.setState({password: e.target.value});
   }

   render(){
       return (
           <div>
               <Navbar />

               <form onSubmit={this.submit}>
                   <input value={this.state.email} onChange={this.email} type="email" placeholder="email"></input> <br/>
                   <input value={this.state.password} onChange={this.password} type="password" placeholder="password"></input> <br/>
                   <button>Login</button>
               </form>
           </div>
       )
   }
}