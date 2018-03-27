import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Redirect } from 'react-router-dom';

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
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

        axios.get('/api/categories').then((response) => {
            const categories = response.data;
            this.setState({categories: categories});             
        }).catch((error) => {

        })
    }

    
    render(){  
        const {categories} = this.state;
        
        const result = this.state.admin ?
                            (
                                <div>
                                    <h2>Categories list</h2>
                                    <table className='table'>
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((value, index) => {
                                                return (
                                                    <tr key={ index }>
                                                        <th scope="row">{value.id}</th>
                                                        <td><a>{value.name}</a></td>
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