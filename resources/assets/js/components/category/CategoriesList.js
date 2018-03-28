import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }

        this.ifAdmin = this.ifAdmin.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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

        this.getCategories();
    }

    getCategories(){
        axios.get('/api/categories').then((response) => {
            const categories = response.data;
            this.setState({categories: categories});             
        }).catch((error) => {

        })
    }

    deleteCategory($id) {
        
        axios.delete(`/api/categories/${$id}`)
        .then((response) => {
            this.getCategories();
        })
        .catch((error) => {
            console.log(error);
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
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((value, index) => {
                                                return (
                                                    <tr key={ index }>
                                                        <th scope="row">{value.id}</th>
                                                        <td><a>{value.name}</a></td>
                                                        <td>
                                                            <button className="btn btn-dark" onClick={() => this.deleteCategory(value.id)}>Delete</button>
                                                            <a className="btn btn-dark" href={`categories/${value.id}/edit`}>Edit</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    <a className='btn btn-dark' href='/categories/create'>Add Category</a>
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