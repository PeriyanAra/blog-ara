import React, { Component } from 'react';
import {Link} from 'react-router-dom';



export default class Navbar extends Component {
    logout() {
        localStorage.clear();
        axios.get('/logout')
        .then((response) => {})
        .catch((err) => {})
    }

    render(){
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