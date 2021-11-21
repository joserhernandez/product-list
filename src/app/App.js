import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            price: '',
            products: []
        };
        this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addProduct(e) {
        //console.log(this.state);
        fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Product Saved'});
            this.setState({name: '', price: ''});
            this.fetchProducts();
        })
        .catch(err => console.error(err));

        e.preventDefault();
    }

    componentDidMount(){
        this.fetchProducts();
    }

    fetchProducts() {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({products: data});
                this.console.log(this.state.products);
            });
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
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Product Name" value={this.state.name}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="number" min="0.00" step="0.01" placeholder="Product Price ($)" value={this.state.price}/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn red darken-4">Add</button>
                                    </form>                                        
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price $</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.products.map(product => {
                                            return (
                                                <tr key={product._id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            
        )
    }
}

export default App;