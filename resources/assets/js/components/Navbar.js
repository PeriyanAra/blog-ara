import React, { Component } from 'react';
import {Link} from 'react-router-dom';



export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.logout = this.logout.bind(this);
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
        
    }

    logout() {
        axios.get('/api/logout')
        .then((response) => {
            localStorage.clear();
            this.props.history.push(`/`);
        })
        .catch((err) => {
            localStorage.clear();
            console.log(err);
        })
    }

    render(){  
        const UserListBtn = this.state.admin ? 
                                (<a href='/users' className='btn btn-primary'>Users List</a>) : 
                                undefined;

        const CategoriesBtn = this.state.admin ?
                                (<a href='/categories' className='btn btn-primary'>Categories</a>) :
                                undefined;
        
        
        const LogBtn =  localStorage.getItem('token')  ? 
                            ( <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Hi {localStorage.getItem('name')}!
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link to='/' onClick={this.logout}>LogOut</Link>
                                </div>
                            </li> )
                            :
                            ( <li className="nav-item">
                                <a className="nav-link" href="/login">LogIn</a>
                            </li> )
        
        const RegBtn = !localStorage.getItem('token') ?
                            (<li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>)
                            :
                            undefined
                                  

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {UserListBtn}
                {CategoriesBtn}

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {RegBtn}                        
                            
                        {LogBtn}
                    </ul>
                </div>
            </nav>
        )
    }
}