import React, { Component } from 'react';

export default class UpdateCategory extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            category_id: this.props.match.params.id,
            category: ''
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

        axios.get(`/api/categories/${this.state.category_id}`).then((response) => {
            const category = response.data;
            this.setState({category: category});
        }).catch((error) => {
            console.log(error);
        })
    }

    handleInput(key, e) {
        var state = {...this.state.category}; 
        state[key] = e.target.value;
        this.setState({category: state });
    }

    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        axios.put(`/api/categories/${this.state.category_id}`, { 
            name: this.state.category.name
        }).then(response => {
            this.props.history.push(`/categories`);
        }).catch(err => {
            console.log(err)
        });
        
    }

    render() {    
        const {category} = this.state;
        const result = this.state.admin ?
                        (
                            <form onSubmit={this.handleSubmit}>
                                <h3>Update category</h3>
                                <div className='form-group'>
                                                            <label htmlFor="name">Name</label>
                                                            <input id="name" className='form-control' type='text' value={category.name} onChange={(e)=>this.handleInput('name',e)} /><br />
                                </div>                  
                                <input className='btn btn-dark' type="submit" value="Add" />
                            </form>
                        ) :
                        (
                            <div>
                                <h1> You are not authorised </h1>
                                <br/>
                                <a href="/" className='btn btn-dark'>Home page</a>
                            </div>
                        );
        
        return(
            <div>
                {result}
            </div>
        )
    }

}