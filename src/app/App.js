import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            price: ''
        };
        this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addProduct(e) {
        console.log(this.state);
        e.preventDefault();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <nav className="red darken-4">
                    <div className="container">
                        <a className="brand-logo" hred="/">Product List</a>
                    </div>
                </nav>
                                
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Product Name"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="number" min="0.00" step="0.01" placeholder="Product Price ($)"/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn red darken-4">Add</button>
                                    </form>                                        
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            
                        </div>
                    </div>
                </div>

            </div>

            
        )
    }
}

export default App;