import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Redirect } from 'react-router-dom';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

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
        
        axios.get('/api/users').then((response) => {
            const users = response.data;
            this.setState({users: users});             
        }).catch((error) => {

        })
    }

    
    render(){ 
        const {users} = this.state;
        
        const result = this.state.admin ?
                            (
                                <div>
                                    <h2>Users list</h2>
                                    <table className='table'>
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((value, index) => {
                                                return (
                                                    <tr key={ index }>
                                                        <th scope="row">{value.id}</th>
                                                        <td><a href={`/users/${value.id}`}>{value.name}</a></td>
                                                        <td>{value.email}</td>
                                                        <td>{value.role}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : 
                            (<h2>You are not authed!!!</h2>)

        return (
            <div>
                <Navbar /><br />

                {result}
            </div>
        )
    }
}